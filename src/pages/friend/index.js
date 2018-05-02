import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';

export default class extends React.Component {
    static async getInitialProps ({ req }) {

        const users = await axios.post('http://127.0.0.1:3000/getFriends').then(function (response) {
            console.log('dfdfdfdfdfdfdfd');
            
        }).catch(function (error) {
            console.log(error);
        });

        return { 
            data: users,
            list: [
                { name: 'hogu' , img: 'https://www.google.co.kr/imgres?imgurl=https%3A%2F%2Fsteemitimages.com%2FDQmWt9v725dWqxaiccJ7kfuY5qH6daTJVvK2G5st3H7GvhM%2Fhungry.gif&imgrefurl=https%3A%2F%2Fsteemit.com%2Fkr%2F%40wony%2F2&docid=FS6qAJb8_0rXmM&tbnid=ZBYv_FiG7379EM%3A&vet=10ahUKEwiB0NT8g-baAhXENJQKHT6jDAMQMwiiASgTMBM..i&w=360&h=360&bih=976&biw=1922&q=%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98&ved=0ahUKEwiB0NT8g-baAhXENJQKHT6jDAMQMwiiASgTMBM&iact=mrc&uact=8', comment:'사랑한다' },
                { name: 'KimChi' , img: 'https://www.google.co.kr/imgres?imgurl=http%3A%2F%2Fimage.chosun.com%2Fsitedata%2Fimage%2F201706%2F16%2F2017061601949_0.jpg&imgrefurl=http%3A%2F%2Fm.chosun.com%2Fsvc%2Farticle.html%3Fcontid%3D2017061602049&docid=MdQGxF9b4iGLaM&tbnid=HAvAYwGatsJqMM%3A&vet=10ahUKEwiB0NT8g-baAhXENJQKHT6jDAMQMwivASgWMBY..i&w=320&h=320&bih=976&biw=1922&q=%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98&ved=0ahUKEwiB0NT8g-baAhXENJQKHT6jDAMQMwivASgWMBY&iact=mrc&uact=8', comment:'싫다' },
                { name: 'RaMen' , img: 'https://www.google.co.kr/imgres?imgurl=http%3A%2F%2Fblogthumb2.naver.net%2F20151002_297%2Fordinary_ez_1443761971617I7xfv_JPEG%2F00.jpg%3Ftype%3Dw2&imgrefurl=http%3A%2F%2Fm.blog.naver.com%2Fordinary_ez%2F220497444862&docid=8DiDVMLv2_hreM&tbnid=fiBA-E7g9h2HJM%3A&vet=10ahUKEwiB0NT8g-baAhXENJQKHT6jDAMQMwjDASgqMCo..i&w=497&h=337&bih=976&biw=1922&q=%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98&ved=0ahUKEwiB0NT8g-baAhXENJQKHT6jDAMQMwjDASgqMCo&iact=mrc&uact=8', comment:'왜그러냐' }
            ]
         };

    }

    render() {  
        console.log(this.props.list);
        
        return (

            <Layout>
                <AddButton>
                    <Link href="/group/addGroup">
                    <ContentAdd style={{ color:'white', height:'56px' }} />
                    </Link>
                </AddButton>
                <Ul>
                    {this.props.list.map( item => (
                        <Item>
                            <Avatar src={item.img} />
                            <Comment> {item.name} </Comment>
                        </Item>
                    ))}
                </Ul>

            </Layout>
        );
    }
}

const AddButton = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    right: 24px;
    bottom: 24px;
    width: 56px;
    border-radius: 28px;
    height: 56px;
    box-sizing: border-box;
    background-color: #0077ff;
    border: 1px solid #006be5;
    cursor: pointer;
    z-index: 10000000;
    color: white;
    &:hover {
        opacity: 0.6;
    }
`

const Ul = styled.ul`
    padding-left: 0px;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 1em;
    background-color: #ffeaa7;
    border-bottom 1px solid #b2bec3;
`

const Comment = styled.div`
    color: #636e72;
    padding-left: 1em;
`