import React, { useState } from "react";

import * as XLSX from "xlsx";

class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      source: "",
      target: ""
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    const type = e.target.getAttribute('id')
    const file = e.target.files[0];
    if (type === 'source') this.setState({ source: file })
    else this.setState({ target: file }) 
  }

  async readFile(type='source') {
    var f = this.state[type];
    var name = f.name;
    const reader = new FileReader();
    return await new Promise((resolve, reject) => {
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
  
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
  
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
  
        resolve(data);
      };
      reader.readAsBinaryString(f);
    })
  }

  async processar() {
    let source = await this.readFile('source')
    let target = await this.readFile('target')

    const targetHeader = target[0] 

    source.shift()
    target.shift()
    
    const result = [targetHeader]
    for (let sourceLine of source) {
      for (let targetLine of target) {
        if(targetLine[1].toString().trim() === sourceLine[0].toString().trim()) {
          let temp = targetLine
          temp[10] = sourceLine[3]
          result.push(temp)
        }
      }
    }
    const workbook = this.aoa_to_workbook(result)

    XLSX.writeFile(workbook, "estoqueAtualizado.xlsx");
  }

  sheet_to_workbook(sheet, opts) {
    var n = opts && opts.sheet ? opts.sheet : "Worksheet";
    var sheets = {}; sheets[n] = sheet;
    return { SheetNames: [n], Sheets: sheets };
  }
  
  aoa_to_workbook(data, opts) {
    return this.sheet_to_workbook(XLSX.utils.aoa_to_sheet(data, opts), opts);
  }

  render() {
    return (
      <div className="container">
        <link rel="stylesheet" href="/atualizarestoque.css"></link>
        <h1>Atualizador de estoque</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-wrapper">
            <label>Estoque:</label>
            <input
              type="file"
              id="source"
              ref="targetUploader"
              onChange={this.filePathset.bind(this)}
            />
          </div>
          <div className="input-wrapper">
            <label>Bling:</label>
            <input
              type="file"
              id="target"
              ref="sourceUploader"
              onChange={this.filePathset.bind(this)}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                this.processar();
              }}
            >
              Processar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ExcelToJson;