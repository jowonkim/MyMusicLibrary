import { Button, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import ApiService from '../../ApiService'; // ApiService를 가져오는 부분

class EditMusicComponent extends Component {

    constructor(props) {
        super(props);

        // 초기 상태(state)를 설정합니다.
        this.state = {
            id: '',
            title: '',
            artist: '',
            genre: '',
            releaseDate: '',
            price: '',
            message: ''
        }
    }

    // 컴포넌트가 마운트되면 음악 데이터를 로드합니다.
    componentDidMount() {
        this.loadMusic();
    }

    // 특정 음악을 ID로 불러와서 state에 저장합니다.
    loadMusic = () => {
        const musicId = window.localStorage.getItem("musicID");

        ApiService.fetchMusicById(musicId)
            .then(res => {
                let music = res.data;
                this.setState({
                    id: music.id,
                    title: music.title,
                    artist: music.artist,
                    genre: music.genre,
                    releaseDate: music.releaseDate,
                    price: music.price
                });
            })
            .catch(err => {
                console.log('loadMusic() Error', err);
            });
    }

    // 입력 필드의 값을 state에 업데이트합니다.
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // 음악 정보를 서버에 업데이트합니다.
    editMusic = (e) => {
        e.preventDefault();

        let inputData = {
            title: this.state.title,
            artist: this.state.artist,
            genre: this.state.genre,
            releaseDate: this.state.releaseDate,
            price: this.state.price
        };

        ApiService.editMusic(this.state.id, inputData)
            .then(res => {
                console.log('Update 성공', res.data);
                this.props.history.push("/music");
            })
            .catch(err => {
                console.log('editMusic() Error', err);
            });
    }

    render() {
        return (
            <div align="center">
                <br></br>
                <Typography variant="h4"> Edit Music </Typography>

                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="ID"
                    type="text"
                    name="id"
                    value={this.state.id}
                    disabled={true} // ID는 수정 불가하게 설정
                /><br /><br />

                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Title"
                    type="text"
                    name="title"
                    value={this.state.title}
                    placeholder="Edit Music Title"
                    onChange={this.onChange} // 입력값이 변경되면 onChange 함수가 호출됩니다.
                /><br /><br />

                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Artist"
                    type="text"
                    name="artist"
                    value={this.state.artist}
                    placeholder="Edit Music Artist"
                    onChange={this.onChange} // 입력값이 변경되면 onChange 함수가 호출됩니다.
                /><br /><br />

                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Genre"
                    type="text"
                    name="genre"
                    value={this.state.genre}
                    placeholder="Edit Music Genre"
                    onChange={this.onChange} // 입력값이 변경되면 onChange 함수가 호출됩니다.
                /><br /><br />

                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Release Date"
                    type="date"
                    name="releaseDate"
                    value={this.state.releaseDate}
                    InputLabelProps={{ shrink: true }}
                    onChange={this.onChange} // 입력값이 변경되면 onChange 함수가 호출됩니다.
                /><br /><br />

                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Price"
                    type="number"
                    name="price"
                    value={this.state.price}
                    placeholder="Edit Music Price"
                    onChange={this.onChange} // 입력값이 변경되면 onChange 함수가 호출됩니다.
                /><br /><br />

                <Button variant="contained" color="primary" onClick={this.editMusic}>
                    Edit
                </Button>  {/* Save 버튼을 클릭하면 editMusic 함수가 호출됩니다. */}

            </div>
        );
    }
}

export default EditMusicComponent;
