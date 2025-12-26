import React, { useRef, useState } from 'react'
import { Card, Button, Typography } from 'antd'

const {Text} = Typography

const FileInput = () => {
  const [filesNames, setFilesNames] = useState([])

  const inputEl = useRef(null)

  const openInput = () => {
    inputEl.current.click()
  }

  const onChangeFile = (event) => {
    const files = event.target.files
    const names = Object.keys(files).map(key => files[key].name)
    setFilesNames(names)
  }

  return (
    <Card
      title="File"
    >
      <input type='file' onChange={onChangeFile} ref={inputEl} multiple hidden />
      <Button
        size="large"
        block
        onClick={openInput}
      >Open Files</Button>
      <Text type="secondary">Response: </Text>
      <div>
        {
          !!filesNames?.length &&
          filesNames.map((name, i) => <div><Text type="warning" key={i}>{name}</Text></div>
          )
        }
      </div>
    </Card>
  )
}

export default FileInput
