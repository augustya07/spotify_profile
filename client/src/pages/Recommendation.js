import react, {useState, useEffect} from "react";
import {Card, Row, Col, Divider, Layout, Space} from 'antd';
import {getRecommendations} from "../spotify";
import {catchErrors} from "../utils";
import axios from "axios";

const {Meta} = Card;
const {Content, Sider} = Layout


const Recommendation = () => {
    const [recommendations, setRecommendations] = useState();
    const [seedArtist, setSeedArtist] = useState('4NHQUGzhtTLFvgF5SZesLK');
    const [seedGenres, setSeedGenres] = useState('classical,country');
    const [seedTracks, setSeedTracks] = useState('4NHQUGzhtTLFvgF5SZesLK');
    const [min_acousticness, setMin_acousticness] = useState()
    const [max_acousticness, setMax_acousticness] = useState()
    const [target_acousticness, seTtarget_acousticness] = useState()
    const [min_danceability, setMin_danceability] = useState()
    const [max_danceability, setMax_danceability] = useState()
    const [target_danceability, setTarget_danceability] = useState()
    const [min_duration_ms, setMin_duration_ms] = useState()
    const [max_duration_ms, setMax_duration_ms] = useState()
    const [target_duration_ms, setTarget_duration_ms] = useState()
    const [min_energy, setMin_energy] = useState()
    const [max_energy, setMax_energy] = useState()
    const [target_energy, setTarget_energy] = useState()
    const [min_instrumentalness, setMin_instrumentalness] = useState()
    const [max_instrumentalness, setMax_instrumentalness] = useState()
    const [target_instrumentalness, setTarget_instrumentalness] = useState()
    const [min_key, setMin_key] = useState()
    const [max_key, setMax_key] = useState()
    const [target_key, setTarget_key] = useState()
    const [min_liveness, seMin_liveness] = useState()
    const [max_liveness, setMax_liveness] = useState()
    const [target_liveness, setTarget_liveness] = useState()
    const [min_loudness, setMin_loudness] = useState()
    const [target_loudness, setTarget_loudness] = useState()
    const [min_mode, setMin_mode] = useState()
    const [max_mode, setMax_mode] = useState()
    const [target_mode, setTarget_mode] = useState()
    const [min_popularity, setMin_popularity] = useState()
    const [max_popularity, setMax_popularity] = useState()
    const [target_popularity, setTarget_popularity] = useState()
    const [min_speechiness, setMin_speechiness] = useState()
    const [max_speechiness, setMax_speechiness] = useState()
    const [target_speechiness, setTarget_speechiness] = useState()
    const [min_tempo, setMin_tempo] = useState()
    const [max_tempo, setMax_tempo] = useState()
    const [target_tempo, setTarget_tempo] = useState()
    const [min_time_signature, setMin_time_signature] = useState()
    const [max_time_signature, setMax_time_signature] = useState()
    const [target_time_signature, setSettarget_time_signature] = useState()
    const [min_valence, setMin_valence] = useState()
    const [max_valence, setMax_valence] = useState()
    const [target_valence, setTarget_valence] = useState()


    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`recommendations`, {
                params: {
                    seed_artists: seedArtist,
                    seed_genres: seedGenres,
                    seed_tracks: seedTracks,
                },
            });
            setRecommendations(data.tracks);
            console.log(data);
        };

        catchErrors(fetchData());

    }, [seedArtist]);


    return (
        <>
            {recommendations && (
                <>
                    <Layout>
                        <Content>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                {recommendations.map((i) => {
                                    return (
                                        <>
                                            <Col span={5}>
                                                {/*<Divider/>*/}
                                                <Space direction="horizontal">
                                                    <Card
                                                        key={i.id}
                                                        hoverable
                                                        style={{width: 240, margin: 20}}
                                                        cover={<img alt="example" src={i.album.images[1].url}/>}
                                                    >
                                                        <Meta title={i.name}/>
                                                    </Card>
                                                </Space>
                                            </Col>
                                        </>
                                    );
                                })}
                            </Row>
                        </Content>

                        <Sider theme="light">


                            Working </Sider>
                    </Layout>

                </>


            )}
        </>

    );
};

export default Recommendation;
