import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import ApiService from '../../ApiService'; // ApiService를 가져오는 부분이 필요합니다.

class AddMusicComponent extends Component {

    constructor(props) {
        super(props);

        // 초기 상태(state)를 설정합니다.
        this.state = {
            title: '',
            artist: '',
            genre: '',
            releaseDate: '',
            price: '',
            message: ''
        }
    }

    // onChange 함수는 입력 필드의 값을 state에 업데이트하는 역할을 합니다.
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // saveMusic 함수는 음악을 저장하는 역할을 합니다.
    saveMusic = (e) => {
        e.preventDefault();

        let inputData = {
            title: this.state.title,
            artist: this.state.artist,
            genre: this.state.genre,
            releaseDate: this.state.releaseDate,
            price: this.state.price
        };

        ApiService.addMusic(inputData)
            .then(res => {
                console.log('insert 성공', res.data);
                this.props.history.push("/music"); // 음악 목록 페이지로 이동합니다.
            })
            .catch(err => {
                console.log('saveMusic() Error', err);
            });
    }

    render() {
        return (
            <div align="center">
                <br /><br />
                <Typography variant="h4"> Add Music </Typography> 

                {/* title 입력 필드 */}
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Title"
                    type="text"
                    name="title"
                    value={this.state.title}
                    placeholder="Input Music Title"
                    onChange={this.onChange}
                /><br /><br />

                {/* artist 입력 필드 */}
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Artist"
                    type="text"
                    name="artist"
                    value={this.state.artist}
                    placeholder="Input Music Artist"
                    onChange={this.onChange}
                /><br /><br />

                {/* genre 입력 필드 */}
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Genre"
                    type="text"
                    name="genre"
                    value={this.state.genre}
                    placeholder="Input Music Genre"
                    onChange={this.onChange}
                /><br /><br />

                {/* releaseDate 입력 필드 */}
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Release Date"
                    type="date"
                    name="releaseDate"
                    value={this.state.releaseDate}
                    InputLabelProps={{ shrink: true }}
                    onChange={this.onChange}
                /><br /><br />

                {/* price 입력 필드 */}
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Price"
                    type="number"
                    name="price"
                    value={this.state.price}
                    placeholder="Input Music Price"
                    onChange={this.onChange}
                /><br /><br />

                {/* Save 버튼 */}
                <Button variant="contained" color="primary" onClick={this.saveMusic}> Save </Button>
            </div>
        )
    }
}

export default withRouter(AddMusicComponent);
