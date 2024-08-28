import React, { Component } from 'react';  // React와 Component 클래스를 가져옵니다.
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Button } from '@mui/material';  // Material-UI 컴포넌트들을 가져옵니다.
import ApiService from '../../ApiService';  // API 서비스와 통신할 커스텀 서비스 모듈을 가져옵니다.
import { Create, Delete } from '@mui/icons-material';  // 수정 및 삭제 아이콘을 사용하기 위해 가져옵니다.

class ListMusicComponent extends Component {

    constructor(props) {
        super(props);

        // 초기 상태(state)를 설정합니다.
        this.state = {
            musics: [],   // 음악 리스트 데이터를 저장할 배열입니다.
            message: null   // 사용자에게 보여줄 메시지를 저장할 변수입니다.
        }
    }

    // React 컴포넌트의 생명주기 메서드 중 하나입니다. 컴포넌트가 마운트된 후에 호출됩니다.
    componentDidMount() {
        this.reloadMusicList();  // 음악 목록을 서버로부터 가져오는 함수를 호출합니다.
    }

    // 음악 목록을 다시 로드하는 함수입니다.
    reloadMusicList = () => {
        ApiService.fetchMusics()  // 스프링 부트와 통신하여 음악 목록을 가져오는 API를 호출합니다.
            .then(res => {   // API 호출이 성공하면 서버에서 반환된 데이터를 받습니다.
                this.setState({
                    musics: res.data  // 서버로부터 받은 데이터를 state에 저장하여 화면에 렌더링될 수 있도록 합니다.
                })
            })
            .catch(err => {  // API 호출이 실패하면 오류를 콘솔에 출력합니다.
                console.log('reloadMusicList() Error', err)
            })
    }

    // 음악 추가를 처리하는 함수입니다.
    addMusic = () => {
        // 사용자가 음악 추가 버튼을 클릭했을 때 호출됩니다.
        this.props.history.push("/add-music");  // 음악 추가 페이지로 이동합니다.
    }

    // 음악 수정을 처리하는 함수입니다.
    editMusic = (ID) => {
        window.localStorage.setItem("musicID", ID);  // 로컬 스토리지에 수정할 음악의 ID를 저장합니다.
        this.props.history.push("/edit-music");  // 음악 수정 페이지로 이동합니다.
    }

    // 음악 삭제를 처리하는 함수입니다.
    deleteMusic = (ID) => {
        // 음악 ID를 기반으로 음악을 삭제하는 로직을 구현합니다.
        ApiService.deleteMusic(ID)  // API를 호출하여 해당 ID의 음악을 삭제합니다.
            .then(res => {
                this.setState({
                    musics: this.state.musics.filter(music => music.id !== ID),
                    message: 'Music deleted successfully.'});  // 성공 메시지를 설정합니다.
                this.reloadMusicList();  // 음악 목록을 다시 로드하여 화면을 갱신합니다.
            })
            .catch(err => {
                console.log('deleteMusic() Error', err);  // 오류가 발생하면 콘솔에 출력합니다.
            });
    }

    render() {
        return (
            <div>
                <br /><br />
                <Typography variant="h4" style={style}> Music List </Typography> 
                <br /><br /> 
                <Button variant="contained" color="primary" onClick={this.addMusic}> Add Music </Button> 
                
                <Table> {/* 음악 리스트를 보여주기 위한 테이블입니다. */}
                    <TableHead> {/* 테이블 헤더를 정의합니다. */}
                        <TableRow> {/* 테이블의 행을 정의합니다. */}
                            <TableCell> Music ID </TableCell>
                            <TableCell> Title </TableCell>
                            <TableCell> Artist </TableCell>
                            <TableCell> Genre </TableCell>
                            <TableCell> Release Date </TableCell>
                            <TableCell> Price </TableCell>
                            <TableCell> Edit </TableCell>
                            <TableCell> Delete </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>    {/* 서버에서 받은 음악 데이터를 바탕으로 테이블의 본문을 구성합니다. */}
                        {this.state.musics.map(music =>  // musics 배열의 각 음악에 대해 테이블의 행을 생성합니다.
                            <TableRow key={music.id}> 
                                <TableCell component="th" scope="music"> {music.id} </TableCell>  
                                <TableCell> {music.title} </TableCell>  
                                <TableCell> {music.artist} </TableCell>  
                                <TableCell> {music.genre} </TableCell> 
                                <TableCell> {new Date(music.releaseDate).toLocaleDateString()} </TableCell>  {/* 날짜를 읽기 쉬운 형식으로 표시 */}
                                <TableCell> {music.price} </TableCell>  
                                <TableCell onClick={() => this.editMusic(music.id)}>  {/* 수정 아이콘 클릭 시 editMusic 함수가 호출됩니다. */}
                                    <Create />  {/* 수정 아이콘을 출력합니다. */}
                                </TableCell>
                                <TableCell onClick={() => this.deleteMusic(music.id)}>  {/* 삭제 아이콘 클릭 시 deleteMusic 함수가 호출됩니다. */}
                                    <Delete />  {/* 삭제 아이콘을 출력합니다. */}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

// 스타일 객체를 정의합니다. 중앙 정렬을 위해 사용됩니다.
const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default ListMusicComponent;
