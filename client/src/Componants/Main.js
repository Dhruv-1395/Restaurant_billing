import React, { useState } from 'react'
import { MdTableBar, MdOutlineCurrencyRupee,MdAssignmentAdd  } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { GiArchiveRegister } from "react-icons/gi";
import { IoFastFoodSharp } from "react-icons/io5";
import { Button, Layout, Menu, theme } from 'antd';
import Navbar from './Navbar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Table from './Table';
import MenuList from './MenuList';
import BookTable from './BookTable';
import OrderStatus from './OrderStatus';
import AddFood from './AddFood';
const { Header, Sider, Content } = Layout;



const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { borderRadiusLG },
    } = theme.useToken();



    return (
        <>
            <Router>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}  >
                        <div className="demo-logo-vertical " />
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    icon: <MdTableBar />,
                                    label: <Link to="/">Table</Link>,
                                },
                                {
                                    key: '2',
                                    icon: <FaClipboardList />,
                                    label: <Link to="/menu">Menu</Link>,
                                },
                                {
                                    key: '3',
                                    icon: <MdOutlineCurrencyRupee />,
                                    label: 'Billing',
                                },
                                {
                                    key: '4',
                                    icon: <GiArchiveRegister />,
                                    label: <Link to="/book">Book Table</Link>,
                                },
                                {
                                    key: '5',
                                    icon: <IoFastFoodSharp />,
                                    label: <Link to="/orders">Orders</Link>,
                                },
                                {
                                    key: '6',
                                    icon: <MdAssignmentAdd />,
                                    label: <Link to="/addfood">Add Food</Link>,
                                },
                            ]}
                        />
                    </Sider>
                    <Layout
                        className=' dark:bg-gray-800'
                    >
                        <Header
                            style={{
                                padding: 0,

                                width: '100%'
                            }}
                            className='flex items-center w-100 bg-white dark:bg-gray-800 dark:text-white'
                        >

                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                                className='text-black dark:text-white'
                            />
                            <Navbar />

                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,

                                borderRadius: borderRadiusLG,
                            }}
                            className='min-h-screen bg-white  dark:bg-gray-800 content-shadow dark:text-white dark:content-shadow'
                        >

                            <Routes>
                                <Route path='/' element={<Table />} />
                                <Route path='/menu' element={<MenuList />}>
                                    <Route path='/menu/:no' element={<MenuList />} />
                                </Route>
                                <Route path='/book' element={<BookTable />} />
                                <Route path='/orders' element={<OrderStatus />} />
                                <Route path='/addfood' element={<AddFood />} />
                            </Routes>

                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </>
    )
}

export default Main