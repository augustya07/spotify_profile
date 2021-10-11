import react, {useState, useEffect} from "react";
import {Layout, Menu} from 'antd';
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'


const {SubMenu} = Menu;
const {Header} = Layout;


const Nav = () => {

    const [navActive, setNavActive] = useState()

    const handleClick = e => {
        console.log('click ', e);
        // this.setState({current: e.key});
        setNavActive(e.key)
    };
    return (
        <Layout>
            <Header>
                <Menu onClick={handleClick} selectedKeys={navActive} mode="horizontal">
                    <SubMenu key="SubMenu" icon={<SettingOutlined/>} title="Album">
                        <Menu.ItemGroup title="Item 1">
                            <Menu.Item key="album"><Link to="/album">Album </Link> </Menu.Item>
                            <Menu.Item key="tracks"><Link to="/tracks">Tracks </Link> </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>

                    <Menu.Item key="mail" icon={<MailOutlined/>}>
                        Navigation One
                    </Menu.Item>


                </Menu>

            </Header>

        </Layout>

    )
}

export default Nav