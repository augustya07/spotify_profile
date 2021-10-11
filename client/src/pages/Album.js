import react, {useState, useEffect} from "react";
import {geAlbumById} from "../spotify";
import {catchErrors} from "../utils";
import {Form, Input, Button, Checkbox} from 'antd';


const Album = () => {
    const [albumData, setAlbumData] = useState()
    const [albumId, setAlbumId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await geAlbumById(albumId)
            setAlbumData(data)
            console.log(data)
            console.log("ran")

        }
        catchErrors(fetchData())
    }, [albumId])
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    console.log(albumId)
    return (
        <>

                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 4,
                        }}

                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            value={albumId}
                            onChange={(e) => setAlbumId(e.target.value)}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                    </Form>
                    {albumData && (

                    <p>
                        <h1>{albumData.total_tracks}</h1>
                        {albumData.images.map((i) => {
                            return (
                                <img src={i.url} alt=""/>
                            )
                        })}

                        <p>{albumData.popularity}</p>
                        {albumData.tracks.items.map((i) => {
                            return (
                                <a href={i.href}>fg</a>
                            )
                        })}
                    </p>

            )}
        </>
    )
}

export default Album
