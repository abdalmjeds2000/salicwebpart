import React from "react";
import imgIcon from '../../../../assets/icons/FilesIcons/jpg.png'
import videoIcon from '../../../../assets/icons/FilesIcons/mp4.png'
import pdfIcon from '../../../../assets/icons/FilesIcons/pdf.png'
import txtIcon from '../../../../assets/icons/FilesIcons/txt.png'
import rarIcon from '../../../../assets/icons/FilesIcons/zip.png'
import wordIcon from '../../../../assets/icons/FilesIcons/doc.png'
import pptIcon from '../../../../assets/icons/FilesIcons/ppt.png'
import csvIcon from '../../../../assets/icons/FilesIcons/csv.png'
import fileIcon from '../../../../assets/icons/FilesIcons/file.png'

const FileIcon = (props) => {
    const checkFileType = (fileType) => {
        if(['jpg', 'jpeg', 'tif', 'tiff', 'bmp', 'png', 'gif', 'raw'].includes(fileType.toLowerCase())) {
            return imgIcon
        } else if(['mp4', 'mp3', 'webm', 'mkv', 'avi', 'mpeg'].includes(fileType.toLowerCase())) {
            return videoIcon
        } else if(['pdf'].includes(fileType.toLowerCase())) {
            return pdfIcon
        } else if(['txt'].includes(fileType.toLowerCase())) {
            return txtIcon
        } else if(['zip', 'rar'].includes(fileType.toLowerCase())) {
            return rarIcon
        } else if(['docx'].includes(fileType.toLowerCase())) {
            return wordIcon
        } else if(['pptx'].includes(fileType.toLowerCase())) {
            return pptIcon
        } else if(['xlsx'].includes(fileType.toLowerCase())) {
            return csvIcon
        } else {
            return fileIcon
        }
    }
    return (
        <img 
            src={checkFileType(props.FileType)}
            title={props.FileName} 
            onClick={() => window.open(props.FilePath, "_blank")} 
            width={props.IconWidth}
            className='attachment-file-icon'
        />
    )
}

export default FileIcon;