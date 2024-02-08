import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import axios from "axios";

import { fetchTitle, fetchUserTitle } from "../../http.js";
import { loginUser, logoutUser, getLocation } from "../../store2/loginUser.js";
import { searchPosts } from "../../store2/post.js";

import { Container, Box, Typography, Tabs, Tab } from "@mui/material";

import Card from "../../components/UI/Card";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const PAGE_SIZE = 5; // 페이지당 표시할 카드 수

const BasicTabs = ({ isPreview }) => {
  const [value, setValue] = useState(0);
  const [visibleCards, setVisibleCards] = useState(PAGE_SIZE);

  const [title, setTitle] = useState("");
  const [userTitle, setUserTitle] = useState("");

  // const posts = useSelector((state) => (state.post ? state.post.posts : []));
  const posts = useSelector((state) =>
    state.post.posts ? state.post.posts : []
  );

  // const [searchs, setSearchs] = useState(null);
  const searchs = useSelector((state) =>
    state.search.searchs ? state.search.searchs : null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      window.document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      const nextPageCards = posts.slice(visibleCards, visibleCards + PAGE_SIZE);

      setVisibleCards((prev) => prev + PAGE_SIZE);

      dispatch({ type: "ADD_CARDS", payload: nextPageCards });
    }
  };

  useEffect(() => {
    if (!isPreview) {
      const fetchData = async () => {
        try {
          const params = {};

          if (searchs.targetMembers) {
            // params.target = searchs.targetMembers;
            params.target = 3;
          }

          if (searchs.ownMembers) {
            params.own = searchs.ownMembers;
          }

          if (searchs.cardType) {
            params.cardType = searchs.cardType;
          }

          if (searchs.query) {
            params.query = searchs.query;
          }

          // params.target = 3;
          // params.own = 4;

          // console.log(params);
          const response = await axios.get(
            "http://localhost:8080/barter/search",
            {
              params: params,
              withCredentials: true,
            }
          );

          dispatch(searchPosts(response.data));
          console.log(response.data);
        } catch (error) {
          console.error("검색 오류 :", error);
        }
      };
      fetchData();
    }
  }, [dispatch, searchs]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Infinity scroll을 적용할 때 추가된 부분
  const visiblePosts = isPreview
    ? posts.slice(0, PAGE_SIZE)
    : posts.slice(0, visibleCards);

  console.log(visiblePosts);

  return (
    <div sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="교환"
            {...a11yProps(0)}
            sx={{ fontWeight: value === 0 ? 600 : 400 }}
          />
          <Tab
            label="판매"
            {...a11yProps(1)}
            sx={{ fontWeight: value === 1 ? 600 : 400 }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {visiblePosts.length == 0 ? (
          <div className="no-content">게시글이 없습니다.</div>
        ) : (
          <div
            style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
          >
            {visiblePosts.map((post, index) => (
              <Card
                key={post.id}
                id={post.id}
                title={post.title}
                images={post.imageUrl}
                ownMembers={post.ownMember}
                targetMembers={post.targetMember}
                isBartered={post.Bartered}
              ></Card>
            ))}
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        >
          {visiblePosts.filter((post) => post.type === "판매").length === 0 ? (
            <div className="no-content">게시글이 없습니다.</div>
          ) : (
            visiblePosts
              .filter((post) => post.type === "판매")
              .map((post, index) => (
                <Card
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  images={post.images}
                  content={post.content}
                  ownMembers={post.ownMembers}
                  type={post.type}
                  isSold={post.isSold}
                ></Card>
              ))
          )}
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default BasicTabs;
