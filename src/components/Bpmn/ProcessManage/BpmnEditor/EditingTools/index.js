import React, { Component } from 'react'
import {
  FolderOpenOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlayCircleOutlined,
  DownloadOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import styles from './index.less'

class EditingTools extends Component {
  handleOpen = () => {
    this.file.click()
  }

  render() {
    const {
      onOpenFIle,
      onZoomIn,
      onZoomOut,
      onZoomReset,
      onUndo,
      onRedo,
      onSave,
      onDownloadXml,
      // onDownloadSvg,
      onPreview,
      // onPreviewXml,
    } = this.props
    return (
      <div className={styles.editingTools}>
        <ul className={styles.controlList}>
          <li className={`${styles.control} ${styles.line}`}>
            <input
              ref={(file) => {
                this.file = file
              }}
              className={styles.openFile}
              type="file"
              accept=".bpmn"
              onChange={onOpenFIle}
            />
            <button type="button" title="打开BPMN文件" onClick={this.handleOpen}>
              <FolderOpenOutlined />
            </button>
          </li>

          <li className={styles.control}>
            <button type="button" title="撤销" onClick={onUndo}>
              <ArrowLeftOutlined />
            </button>
          </li>
          <li className={`${styles.control} ${styles.line}`}>
            <button type="button" title="恢复" onClick={onRedo}>
              <ArrowRightOutlined />
            </button>
          </li>

          <li className={styles.control}>
            <button type="button" title="重置大小" onClick={onZoomReset}>
              <ReloadOutlined />
            </button>
          </li>
          <li className={styles.control}>
            <button type="button" title="放大" onClick={onZoomIn}>
              <PlusCircleOutlined />
            </button>
          </li>
          <li className={`${styles.control} ${styles.line}`}>
            <button type="button" title="缩小" onClick={onZoomOut}>
              <MinusCircleOutlined />
            </button>
          </li>

          <li className={styles.control}>
            <button type="button" title="部署流程" onClick={onSave}>
              <PlayCircleOutlined />
            </button>
          </li>
          <li className={styles.control}>
            <button type="button" title="下载BPMN文件" onClick={onDownloadXml}>
              <DownloadOutlined />
            </button>
          </li>
          {/* <li className={styles.control}>
            <button type="button" title="下载流程图片" onClick={onDownloadSvg}>
              <DownloadOutlined />
            </button>
          </li> */}
          <li className={styles.control}>
            <button type="button" title="预览流程图片" onClick={onPreview}>
              <FileImageOutlined />
            </button>
          </li>
          {/* <li className={styles.control}>
            <button type="button" title="查看流程xml" onClick={onPreviewXml}>
              <i className={styles.preview} />
            </button>
          </li> */}
        </ul>
      </div>
    )
  }
}

export default EditingTools
