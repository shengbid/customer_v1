import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Radio, Select } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import { getRoleList } from '@/services'
import { handleOptionData } from '@/utils/base'

interface handleAssigneeProps {
  handleAssignee: (count: number, name: string) => void
}
// 处理人设置
const HandleUser: React.FC<handleAssigneeProps> = ({ handleAssignee }) => {
  const [roleList, setRoleList] = useState<any>([]) // 流程表单

  const getList = async () => {
    const { rows } = await getRoleList({ pageNum: 1, pageSize: 20 })
    setRoleList(handleOptionData({ data: rows, value: 'roleId', label: 'roleName' }))
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <Form.Item label="处理人" name="assigneeType">
        <Radio.Group
          options={[
            {
              label: '指定用户',
              value: '1',
            },
            // {
            //   label: '流程发起人',
            //   value: '2',
            // },
            // {
            //   label: '上级节点指定',
            //   value: '3',
            // },
          ]}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 24 }}
        shouldUpdate={(prevValues, curValues) => prevValues.assigneeType !== curValues.assigneeType}
        noStyle
      >
        {({ getFieldValue }) => {
          const assigneeType = getFieldValue('assigneeType')
          return assigneeType === '1' || assigneeType === '3' ? (
            <>
              {assigneeType === '1' && (
                <>
                  {/* <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    colon={false}
                    label=" "
                    name="assigneeName"
                  >
                    <Input
                      allowClear
                      readOnly
                      prefix={<UserOutlined />}
                      suffix={
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            handleAssignee(1, 'assignee')
                          }}
                        />
                      }
                    />
                  </Form.Item> */}
                  <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    label="处理人组"
                    name="candidateUsersName"
                  >
                    <Input
                      allowClear
                      readOnly
                      prefix={<UserOutlined />}
                      suffix={
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            handleAssignee(1000, 'candidateUsers')
                          }}
                        />
                      }
                    />
                  </Form.Item>
                </>
              )}
              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                label="处理角色"
                name="candidateGroups"
              >
                <Select options={roleList} mode="multiple" />
              </Form.Item>
            </>
          ) : null
        }}
      </Form.Item>
    </>
  )
}

export default HandleUser
