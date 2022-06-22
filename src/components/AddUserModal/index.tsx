import type { ReactText } from 'react'
import React, { useState, useEffect } from 'react'
import { Modal, Tree, Input, Button, Avatar, Tooltip } from 'antd'
import { UserOutlined, CloseOutlined } from '@ant-design/icons'
import { getDeptList, getUserList } from '@/services'
import type { userProps } from '@/services/types'
import { handleTreeData } from '@/utils/base'

import ProList from '@ant-design/pro-list'

import styles from './index.less'

const { Search } = Input

interface DataNode {
  title: string
  key: number
  children?: DataNode[]
}

const getOrgData = async () => {
  const { data } = await getDeptList({
    pageNum: 1,
    pageSize: 20,
  })
  return handleTreeData(data, 'deptId', 'deptName', 'title', 'key')
}
const getUserData = async (orgId: any): Promise<userProps[]> => {
  const { rows } = await getUserList({ deptId: orgId, pageNum: 1, pageSize: 20 })
  return rows
}

/**
 * @description: 人员处理器
 * @param {boolean} visible 是否显示
 * @param {Array} initSelectUser 已经选择的人员
 * @param {number} maxSelectedNum 最多能选择的人员
 * @param {function} onFinish 隐藏模态框
 * @param {function} onFinish 确认事件
 * @return {*}
 */
// eslint-disable-next-line no-unused-vars
const AddUserModal: React.FC<{
  visible: boolean
  userKey: any
  initSelectUser: Array<any>
  maxSelectedNum: number
  toggleModal: () => void
  onFinish: (selectUser: userProps[], name: string) => void
  typeName: string
}> = ({
  visible = false,
  initSelectUser = [],
  maxSelectedNum = 1,
  toggleModal,
  onFinish,
  typeName,
  userKey = 'id',
}) => {
  const [orgData, setTreeData] = useState<Array<DataNode>>([])
  const [selectedOrg, setSelectedOrg] = useState<any>('')
  const [userList, setUser] = useState<Array<userProps>>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>(
    initSelectUser.map((itme) => itme[userKey]),
  )
  const [selectUser, setSelectUser] = useState<Array<userProps>>(initSelectUser)

  const rowSelection: any = {
    selectedRowKeys,
    onSelect: (record: userProps) => {
      // console.log(keys)
      if (selectedRowKeys.includes(record[userKey])) {
        // 反选
        setSelectedRowKeys([...selectedRowKeys.filter((item) => item !== record[userKey])])
        setSelectUser([...selectUser.filter((item) => item[userKey] !== record[userKey])])
      } else {
        setSelectedRowKeys([...selectedRowKeys, record[userKey]])
        setSelectUser([...selectUser, record])
      }
    },
    getCheckboxProps: (record: userProps) => ({
      disabled:
        selectedRowKeys.length >= maxSelectedNum && !selectedRowKeys.includes(record[userKey]), // Column configuration not to be checked
    }),
  }
  useEffect(() => {
    // 显示的时候重新查询组织架构
    if (visible) {
      getOrgData().then((results) => {
        setTreeData(results)
      })
      setSelectUser(initSelectUser)
      setSelectedRowKeys(initSelectUser.map((itme) => itme[userKey]))
    }
  }, [visible, initSelectUser, userKey])

  useEffect(() => {
    // 选择的组织改变
    if (selectedOrg) {
      getUserData(selectedOrg).then((results) => {
        setUser(results)
      })
    }
  }, [selectedOrg])

  const selectOrg = (selectedKeys: ReactText[]) => {
    setSelectedOrg(selectedKeys[0])
  }
  const resetSelectUser = () => {
    setSelectedRowKeys([])
    setSelectUser([])
  }
  const onSearch = async (value: string) => {
    const { rows } = await getUserList({ userName: value, pageNum: 1, pageSize: 20 })
    setUser(rows)
  }
  return (
    <Modal
      title="人员选择"
      visible={visible}
      footer={null}
      forceRender
      onCancel={() => {
        toggleModal()
      }}
      width={1000}
    >
      <div className={styles.top}>
        <Search placeholder="搜索用户" allowClear onSearch={onSearch} style={{ width: 200 }} />
      </div>
      <div className={styles.middle}>
        <div className={styles.organization}>
          <div className={styles.title}>组织架构</div>
          <Tree treeData={orgData} onSelect={selectOrg} />
        </div>
        <div className={styles.member}>
          <ProList<userProps>
            // tableAlertRender={ false } // 控制取消选择
            metas={{
              title: {
                dataIndex: 'userName',
              },
              description: {
                render: (_, record) => <>{record?.dept.deptName}</>,
              },
              avatar: {
                render: () => (
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                ),
              },
            }}
            rowKey={userKey}
            headerTitle="成员列表"
            rowSelection={rowSelection}
            dataSource={userList}
          />
        </div>
      </div>
      <div className={styles.selected}>
        <div className={styles.close}>
          <Tooltip title="清空">
            <CloseOutlined className={styles.closeicon} onClick={resetSelectUser} />
          </Tooltip>
        </div>
        {selectUser.map((item) => (
          <div className={styles.item} key={Math.random()}>
            <Avatar style={{ backgroundColor: '#87d068' }} size={36} icon={<UserOutlined />} />
            <span className={styles.name}>{item.userName}</span>
          </div>
        ))}
      </div>
      <div className={styles.tip}>
        <span>
          已选：{selectUser.length} / {maxSelectedNum} 位
        </span>
      </div>
      <div className={styles.okbt}>
        {' '}
        <Button
          onClick={() => {
            onFinish(selectUser, typeName)
          }}
          type="primary"
        >
          确定
        </Button>
      </div>
    </Modal>
  )
}

export default AddUserModal
