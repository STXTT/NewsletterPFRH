import React,{useEffect, useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonMailto from "./ButtonMailto";
import EmailEditor from 'react-email-editor';
import template from './template.json'
import templateDRF from './templateDRF.json'
import { Button,Switch } from "@mui/material";


const Newsletter = ({selectedMode,setSelectedMode}) => {
  const emailEditorRef = useRef(null);
  const [isReady,setIsReady]=useState(false);


  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      navigator.clipboard.writeText(html)
      window.location.href = "mailto:"

    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
     emailEditorRef.current.editor.loadDesign(template);
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady');
    setIsReady(true)
  };

  return (
    <div>
      <div>

        <Button onClick={exportHtml}>Export HTML</Button>

        Thème :
        <Switch checked={selectedMode} onChange={()=>{
      setSelectedMode(!selectedMode);
      !selectedMode ? emailEditorRef.current.editor.loadDesign(template)
      :      emailEditorRef.current.editor.loadDesign(templateDRF);


      }} inputProps={{ 'aria-label': 'controlled' }}/>
        
      </div>
      
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
        minHeight={700}
      />
    </div>
  );
};
export default Newsletter;
