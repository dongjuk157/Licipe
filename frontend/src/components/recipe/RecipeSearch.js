import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeSubCategory from './RecipeSubCategory';
import axios from 'axios';
import SearchAppBar from './../common/SearchAppBar'
import { 
  Box, 
  Typography, 
  Tab, 
  Tabs, 
  makeStyles,
  Button,
} from '@material-ui/core';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT


const TabPanel = (props) => {
// function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      // tabpanel의 역할을 하는 명시
      role="tabpanel"
      // 탭에서 클릭한 항목 이외의 내용을 숨김
      hidden={value !== index}
      {...other}
    >
      {/* 탭에서 클릭한 인덱스에 children 요소를 보여준다 */}
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
          <Typography>
          {/* {categories.map(category => category.map((element) => {
          
        }))} */}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  /** 
  * Anything that can be rendered: numbers, strings, elements or an array
  * (or fragment) containing these types.
  */
  children: PropTypes.node,
  // A value of any data type
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 350,
    marginBottom: 50,
    marginTop: 100,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const RecipeSearch = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [recipeList, setRecipeList] = useState([]);
  const [mainCategory, setMainCategory] = useState([])
  const [categories, setCategories] = useState([
    'countries',
    'times',
    'situations',
    'ingredients',
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const GetRecipeCateogry = async () => {
    // 각 카테고리의 대분류를 받아옴
    for (let category of categories) {
      await axios.get(`/foods/${category}`)
      .then((res) => {
        console.log(category)
        setMainCategory(prevState => [...prevState, res.data])
      })
      .catch((err) => {
        console.log(err)
      })
    }
  };

  const getRecipeList = (subCategory, mainCategory) => {
    console.log(subCategory, mainCategory)
  }

  useEffect(() => {
    GetRecipeCateogry();
  }, []);


  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <div className={classes.root}>
        <Tabs
        // Tabs need to be connected to their corresponding [role="tabpanel"] 
          orientation="vertical"
          variant="scrollable"
          value={value}
          // 탭이 변할 때 마다 setValue 값이 value로 변함
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab label='선택'/>
          {/* tab들의 index를 할당 */}
          {categories.map((category, index) => {
            return (
              // 카테고리의 세로 대분류 부분을 표시
              <Tab label={category} key={index}/>
            )
          })}
        </Tabs>

        {/* The value of the corresponding Tab. Must use the index of 
        the Tab when no value was passed to Tab. 
        탭을 전환할 때 모든 TabPanel의 index 값과 활성화된 Tab의 value를 비교 
        변경된 value state를 꾸준히 보내서 체크
        */}
        <TabPanel value={value} index={0}>
          대분류를 선택해 주세요
        </TabPanel>
        {/* 각 카테고리의 소분류를 Object에서 배열로, 2차원 배열에서 1차원으로 */}
        {mainCategory.map((elements, index) => {
          console.log(mainCategory, '정체가뭐니')
          return(
            elements.map((element) => {
              return(
                // index 값은 화면에서 활성화된 버튼의 번호
                <TabPanel value={value} index={index + 1} key={Object.values(element)[index]}>
                  {/* TODO : 컴포넌트로 불러온 레시피들을 나열해야함 */}
                  <Button onClick={() => getRecipeList(element, categories[index])}>{element.name ? element.name : element.maxTime}</Button>
                </TabPanel>
              )
              })
          )
        })}
      </div>
      <RecipeSubCategory recipeList={recipeList}></RecipeSubCategory>
    </div>
  );
}

export default RecipeSearch;