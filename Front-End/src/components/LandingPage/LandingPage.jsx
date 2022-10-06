/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Container, Carousel, Button, Badge, ListGroup } from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Form from 'react-bootstrap/Form';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');
//TODO:  Add an alt description for each img

function LandingPage({ currentUser, videoData, setVideoData }) {
  const [index, setIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState('');
  const [sortOn, setSortOn] = useState('insightful');
  const [favorited, setFavorited] = useState(['unfavorited', 'Favorite this Creator!']);
  // ============= is the user a favorite ==================
  useEffect(() => {
    if (videoData && currentUser) {
      axios.get('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/user')
        .then(res => {
          res.data.forEach(profile => {
            if (profile.username === currentUser.username) {
              if (profile.favCreator.includes(videoData[index].username)) {
                setFavorited(['favorited', 'This is one of your Favorite Creators']);
              } else {
                setFavorited(['unfavorited', 'Favorite this Creator!']);
              }
            }
          })
        })
    }
  }, [index, videoData]);


  useEffect(() => {
    getThumbnails();
  }, [sortOn])

  const getThumbnails = () => {
    let results = videoData;
    if (sortOn === 'favorited') {
      results = [];
      axios.get(`http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/user/favs`, {
        params: {
          user: currentUser.username
        }
      })
        .then((data) => {
          console.log(data);
          for (let i = 0; i < videoData.length; i++) {
            for (let j = 0; j < data.data.length; j++) {
              if (data.data[j] === videoData[i].username) {
                results.push(videoData[i]);
              }
            }
          }
        })
        .then(() => {
          setVideoData(results);
          setIndex(0);
          let temp = [];
          for (var i = 0; i < results.length; i++) {
            if (results[i]) {
              temp.push(results[i].url.replace('.mp4', '.jpg'));
            }
          }
          setThumbnails(temp)
          return;
        })
    }
    if (sortOn === 'insightful') {
      for (let i = 0; i < videoData.length; i++) {
        results.sort((a, b) => {
          return b.votes.insightful.usernames.length - a.votes.insightful.usernames.length
        })
      }
    }
    if (sortOn === 'informative') {
      for (let i = 0; i < videoData.length; i++) {
        results.sort((a, b) => {
          return b.votes.informative.usernames.length - a.votes.informative.usernames.length
        })
      }
    }
    if (sortOn === 'funny') {
      for (let i = 0; i < videoData.length; i++) {
        results.sort((a, b) => {
          return b.votes.funny.usernames.length - a.votes.funny.usernames.length
        })
      }
    }
    if (sortOn === 'recent') {
      for (let i = 0; i < videoData.length; i++) {
        results.sort((a, b) => {
          return Date.parse(b.dateUploaded) - Date.parse(a.dateUploaded)
        })
      }
    }
    setVideoData(results);
    setIndex(0);
    let temp = [];
    for (var i = 0; i < results.length; i++) {
      if (results[i]) {
        temp.push(results[i].url.replace('.mp4', '.jpg'));
      }
    }
    setThumbnails(temp);
  }
  useEffect(() => {
    if (videoData) {
      let temp = [];
      for (var i = 0; i < videoData.length; i++) {
        if (videoData[i]) {
          temp.push(videoData[i].url.replace('.mp4', '.jpg'));
        }
      }
      setThumbnails(temp);
    }
  }, [videoData]);
  // ================ handle button updates to the database ==================
  const handleInsightful = () => {
    axios.put(`http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/video/insightful`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleUnInsightful = () => {
    axios.put(`http://ec2-18-217-242-14.us-east-2.compute.amazonaws.comvideo/insightfulx`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleInformative = () => {
    axios.put(`http://ec2-18-217-242-14.us-east-2.compute.amazonaws.comvideo/informative`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
        if (videoData[index].votes.informative.usernames.includes(currentUser)) {
          setInformative(true);
        } else {
          setInformative(false);
        }
      })
      .catch(err => console.log(err));
  }
  const handleUnInformative = () => {
    axios.put(`http://ec2-18-217-242-14.us-east-2.compute.amazonaws.comvideo/informativex`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleFunny = () => {
    axios.put(`http://ec2-18-217-242-14.us-east-2.compute.amazonaws.comvideo/funny`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleUnFunny = () => {
    axios.put(`http://ec2-18-217-242-14.us-east-2.compute.amazonaws.comvideo/funnyx`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  function handleFave() {
    return axios.put('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/userprofile', { currentUser: currentUser, user: videoData[index].username })
      .then((data) => {
        setFavorited(['favorited', 'This is one of your Favorite Creators']);
      });
  }
  function handleUnFave() {
    return axios.put('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/userprofilex', { currentUser: currentUser, user: videoData[index].username })
      .then((data) => {
        setFavorited(['unfavorited', 'Favorite this Creator!']);
      });
  }
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  if (videoData.length) {
    return (
      <div>
        {
          (!thumbnails.length) ? <div></div> :
            <Container className="w-auto p-11">
              <Form.Select id="dropdown-selector" size="lg" onChange={(e) => {
                const selectedMenuOption = e.target.value;
                setSortOn(selectedMenuOption);
              }}>
                <option value='recent'>most recent</option>
                <option value='informative'>Informative</option>
                <option value='favorited'>most favorited creators</option>
                <option value='insightful'>Insightful</option>
                <option value='funny'>Funny</option>
              </Form.Select>
              <Row >
                <Col id="video-carousel-container" className="border-success">
                  <div id="landing-page-topbar">
                    <Row>
                      <Col id="data">
                        <h1 id="VideoTitle">{videoData[index].title}</h1>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <div id="time" className="board-primary">{timeAgo.format(new Date(videoData[index].dateUploaded).getTime(), 'round-minute')}</div>
                  </Row>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Link to="profile_page" state={{ currentUser: currentUser, user: videoData[index].username }}>
                      <h5 className="videoUser"><strong>{videoData[index].username}</strong></h5>
                    </Link>
                    <Badge id={favorited[0]} className="border border-warning" pill bg="warning" text="dark" onClick={() => {
                      (favorited[0] === 'favorited') ? handleUnFave() : handleFave()
                    }
                    }
                    >{favorited[1]}</Badge>
                  </div>
                  <div id="des">
                    <h5 id="description">{videoData[index].description}</h5>
                  </div>
                </Col>
                <Col id="carousel" className="border-success" md={8}>
                  <Carousel activeIndex={index} onSelect={handleSelect} interval={null} onSlide={setIndex}>
                    {
                      thumbnails.map((thumbnail, i) => {
                        return (<Carousel.Item key={i}>
                          <Link to="video_page" state={{ 'currentUser': currentUser, 'video': videoData[index] }}>
                            <img className="d-block w-100" style={{ objectFit: 'cover', maxHeight: '500px' }} src={thumbnail} />
                          </Link>
                        </Carousel.Item>)
                      })
                    }
                  </Carousel>
                </Col>
              </Row>
              <Row className="text-center">
                <div >
                  <div>
                    <Button variant="primary" id="insightful-landing" className="vote nonclick">Insightful
                      <br>
                      </br>
                      <Badge bg="secondary">{videoData[index].votes.insightful.usernames.length}</Badge>
                    </Button>
                    <Button variant="primary" id="funny-landing" className="vote">Funny<br>
                    </br><Badge bg="secondary" className="voteCount">{videoData[index].votes.funny.usernames.length}</Badge>
                    </Button>
                    <Button variant="primary" id="informative-landing" className="vote" >Informative
                      <br>
                      </br>
                      <Badge bg="secondary" className="voteCount">{videoData[index].votes.informative.usernames.length}</Badge>
                    </Button>
                  </div>
                </div>
              </Row>
            </Container>
        }
      </div>
    )
  }
  return null;
}
export default LandingPage;