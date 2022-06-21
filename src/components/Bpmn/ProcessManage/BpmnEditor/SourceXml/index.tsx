import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/xml/xml'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/xml-fold'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/selection/active-line'

import styles from './index.less'

interface IProps {
  data: string
}

export default (props: IProps) => {
  const { data } = props
  return (
    <div className={styles.root}>
      <CodeMirror
        value={data}
        options={{
          tabSize: 4,
          mode: { name: 'xml', json: true },
          theme: 'idea',
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          foldgutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
          lineWrapping: true, // 代码折叠
          foldGutter: true,
          matchBrackets: true, // 括号匹配
          autoCloseBrackets: true,
          showCursorWhenSelecting: true,
        }}
        className={styles.codemirror}
      />
    </div>
  )
}
