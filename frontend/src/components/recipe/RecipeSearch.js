import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import RecipeSubCategory from './RecipeSubCategory';
import axios from 'axios';
import SearchAppBar from './../common/SearchAppBar'
import { Tabs, Tab, Button, ButtonGroup, Col, Row, Nav } from 'react-bootstrap';
axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT

const RecipeSearch = () => {
  // const classes = useStyles();
  const [value, setValue] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [times, setTimes] = useState([]);
  const [situations, setSituations] = useState([]);
  // const [categories, setCategories] = useState([
  //   'countries',
  //   'times',
  //   'situations',
  // ]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const GetCountries = async () => {
    // 각 카테고리의 대분류를 받아옴
      await axios.get(`/foods/countries`)
      .then((res) => {
        setCountries([res.data])
        // countries = res.data;
      })
      .catch((err) => {
        console.log(err)
      })
      console.log('countries')
      console.log(countries);
    }
  
  const GetTimes = async () => {
    // 각 카테고리의 대분류를 받아옴
      await axios.get(`/foods/times`)
      .then((res) => {
        setTimes([res.data])
      })
      .catch((err) => {
        console.log(err)
      })
      console.log('times')
      console.log(times);
    }

  const GetSituations = async () => {
    // 각 카테고리의 대분류를 받아옴
      await axios.get(`/foods/situations`)
      .then((res) => {
        setSituations([res.data])
      })
      .catch((err) => {
        console.log(err)
      })
      console.log('situations')
      console.log(situations);
    }

  const getFoodList = async (mainCategory, subCategoryId) => {
    await axios.get(`/foods/${mainCategory}/${subCategoryId}`)
    .then((res) => {
      setFoodList([res.data])
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    GetCountries();
  }, []);

  useEffect(() => {
    GetTimes();
  }, []);

  useEffect(() => {
    GetSituations();
  }, []);



  const [key, setKey] = useState('home');

  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <div>
        <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"

      >
        <Tab eventKey="home" title="분류 선택">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <p>분류를 선택하고 레시피를 쉽게 찾아보세요 :)</p>
          </Tab.Container>
        </Tab>
          
        <Tab eventKey="country" title="나라" >
          <Tab.Container id="left-tabs-example">
            <Row>
              <Col sm={3}>
                { countries.length > 0 && countries[0].map((element, index) => {
                return (
                  <Col
                    key={element.name+'nav'+index}
                  > 
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey={element.id} onClick={() => 
                          getFoodList('countries', element.id)}>{element.name}</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  )
                })}
              </Col>
              <Col sm={9}>
                { countries.length > 0 && countries[0].map((element, index) => {
                  return(
                    <Col 
                      key={element.name+'tab'+index}
                    >
                      <Tab.Content>
                        <Tab.Pane eventKey={element.id}>
                          {/* 요리 리스트 */}
                          <RecipeSubCategory categoryFoodList={foodList}></RecipeSubCategory>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  )
                })}
              </Col>
            </Row>
          </Tab.Container>
        </Tab>

        <Tab eventKey="time" title="소요시간" onClick={() => GetTimes()}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}> 
                { times.length > 0 && times[0].map((element, index) => {
                return(
                  <Col
                    key={element.name+'nav'+index}
                  >
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey={element.id} onClick={() => 
                          getFoodList('times', element.id)}>{element.maxTime}분</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                )
                })}
              </Col>
              <Col sm={9}>
                { times.length > 0 && times[0].map((element, index) => {
                return(
                  <Col
                    key={element.name+'tab'+index}
                  >
                    <Tab.Content>
                      <Tab.Pane eventKey={element.id}>
                        {/* 요리 리스트 */}
                        <RecipeSubCategory categoryFoodList={foodList}></RecipeSubCategory>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                  )
                })}
              </Col>
            </Row>
          </Tab.Container>
        </Tab>

        <Tab eventKey="situations" title="상황" onClick={() => GetSituations()}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row key>
              <Col sm={3}> 
                { situations.length > 0 && situations[0].map((element, index) => {
                  return(
                    <Col>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey={element.id} onClick={() => 
                            getFoodList('situations', element.id)}>{element.name}</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  )
                })}
              </Col>
              <Col sm={9}>
                { situations.length > 0 && situations[0].map((element, index) => {
                  return(
                    <Col>
                      <Tab.Content>
                        <Tab.Pane eventKey={element.id}>
                          {/* 요리 리스트 */}
                          <RecipeSubCategory categoryFoodList={foodList}></RecipeSubCategory>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  )
                })}
              </Col>
            </Row>
          </Tab.Container>
        </Tab>

      </Tabs>
      </div>
    </div>
  );
  }

export default RecipeSearch;