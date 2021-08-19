import React, { useEffect, useState } from 'react';
import RecipeSubCategory from './RecipeSubCategory';
import axios from 'axios';
import SearchAppBar from '../common/SearchAppBar'
import { Tabs, Tab, Col, Row, Nav } from 'react-bootstrap';
import 'bootstrap';
import '../../style/recipe_search.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT

const RecipeSearch = () => {
  const [foodList, setFoodList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [times, setTimes] = useState([]);
  const [situations, setSituations] = useState([]);
  
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
    <div style={{background: '#ffffff'}}>
      <SearchAppBar></SearchAppBar>
      <div className="" style={{height:'95vh'}}>
        <Tabs
          fill
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mx-3 px-2 pt-2 fs-5 rounded-top myClass"
      >
        <Tab.Item eventKey="home" title="분류 선택">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <div className="m-5 text-center fs-4 h-100 p-5">분류를 선택해서 레시피를 더 쉽게 찾아보세요 :)</div>
          </Tab.Container>
        </Tab.Item>
          
        <Tab eventKey="country" title="나라" variant="" id="">
        <Tab.Container>
          <Row>
           <Col sm={3} className="m-3">
              { countries.length > 0 && countries[0].map((element, index) => {
              return(
                  <Col
                    key={element.name+'nav'+index}
                  > 
                    <Nav variant="pills" className="m-2 fs-5">
                    <Nav.Item className="w-100">
                      <Nav.Link className="btn my-2 rounded-3 shadow-sm"
                        eventKey={element.id} onClick={() => 
                        getFoodList('countries', element.id)}>{element.name}</Nav.Link>
                    </Nav.Item>
                    </Nav>
                  </Col>
              )
              })}
            </Col>
            <Col sm={8} className="mt-3 pt-2">
            
              { countries.length > 0 && countries[0].map((element, index) => {
                return(
                  <Col 
                    key={element.name+'tab'+index}
                  >
                    <Tab.Content>
                      <Tab.Pane eventKey={element.id}>
                        {/* 요리 리스트 */}
                        <RecipeSubCategory categoryFoodList={foodList}>
                        </RecipeSubCategory>
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
        <Tab.Container>
          <Row>
          <Col sm={3} className="m-3">
              { times.length > 0 && times[0].map((element, index) => {
              return(
                  <Col 
                    key={element.maxTime+'nav'+index}
                  > 
                    <Nav variant="pills" cclassName="m-2 fs-5">
                      <Nav.Link className="btn my-2 rounded-3 shadow-sm w-100"  
                      eventKey={element.id} onClick={() => 
                        getFoodList('times', element.id)}>{element.maxTime} 분 
                      </Nav.Link>
                    </Nav>
                  </Col>
              )
              })}
            </Col>
            <Col sm={8} className="mt-3 pt-2">
            
              { times.length > 0 && times[0].map((element, index) => {
                return(
                  <Col 
                    key={element.maxTime+'tab'+index}
                  >
                    <Tab.Content>
                      <Tab.Pane eventKey={element.id}>
                        {/* 요리 리스트 */}
                        <RecipeSubCategory categoryFoodList={foodList}>
                        </RecipeSubCategory>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                )
              })}
            </Col>
          </Row>
        </Tab.Container>
        </Tab>

        <Tab eventKey="situations" title="상황" 
          onClick={() => GetSituations()} disabled
          style={{}}>
        <Tab.Container>
          <Row>
          <Col sm={3} className="m-3">
              { situations.length > 0 && situations[0].map((element, index) => {
              return(
                  <Col
                    key={element.name+'nav'+index}
                  > 
                    <Nav variant="pills" className="m-2 fs-5">
                        <Nav.Link className="btn my-2 rounded-3 shadow-sm w-100" eventKey={element.id} onClick={() => 
                          getFoodList('situations', element.id)}>{element.name}</Nav.Link>
                    </Nav>
                  </Col>
              )
              })}
            </Col>
            <Col sm={8} className="mt-3 pt-2">
            
              { situations.length > 0 && situations[0].map((element, index) => {
                return(
                  <Col 
                    key={element.name+'tab'+index}
                  >
                    <Tab.Content>
                      
                      <Tab.Pane eventKey={element.id} >
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