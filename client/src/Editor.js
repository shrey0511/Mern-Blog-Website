import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function Editor({value,onChange}){
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
        
            //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            //[{ 'direction': 'rtl' }],                         // text direction
        
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            
            [{ 'font': [] }],
            [{ 'align': [] }],
        
            ['clean']                                         // remove formatting button
        ]
    };

    // const formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'link', 'image'
    // ];
    
    return(
        <ReactQuill 
            style={{backgroundColor : '#EEEEEE'}}
            value={value}
            theme={'snow'}
            onChange={onChange} 
            modules={modules}/>
    );
}