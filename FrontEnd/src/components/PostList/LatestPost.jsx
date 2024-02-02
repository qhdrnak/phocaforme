import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';

import {
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  ImageList,
  ImageListItem,
} from "@mui/material";

import Card from "../../components/UI/Card";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <>
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
    </>
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

const LatestPost = () => {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    // 로컬 스토리지에서 최근 본 게시물을 가져옵니다.
    const storedRecentPosts = JSON.parse(localStorage.getItem("recentCard")) || [];
    setRecentPosts(storedRecentPosts);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 게시물로 이동 핸들러
  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <Container>
      <h2 className="profile-title">최근 본 게시글</h2>
      <div>
        <Box sx={{ width: "70vw", borderBottom: 1, borderColor: "divider" }}>
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
          <ImageList
            id="card-list"
            sx={{ display: "flex", width: "100%" }}
            rowHeight={200}
          >
            {recentPosts && 
              recentPosts
              .filter((post) => post.type === "교환")
                .map((post, index) => (
                  <div
                    className="cards-container"
                    key={index}
                    onClick={() => handleClick(post.id)}
                  >
                    <Card
                      key={post.id}
                      style={{
                        objectFit: "contain",
                        margin: "0 16px 16px 0",
                        cursor: "pointer",
                      }}
                      id={post.id}
                      title={post.title}
                      images={post.images}
                      ownMembers={post.ownMembers}
                      targetMembers={post.targetMembers}
                      content={post.content}
                      type={post.type}
                      isBartered={post.isBartered}
                    ></Card>
                  </div>
                )).reverse()}
          </ImageList>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ImageList
            id="card-list"
            sx={{ display: "flex", width: "100%" }}
            rowHeight={200}
          >
            {recentPosts && 
              recentPosts
              .filter((post) => post.type === "판매")
              .map((post, index) => (
              <div
                className="cards-container"
                key={index}
                onClick={() => handleClick(post.id)}
              >
                <Card
                  key={post.id}
                  style={{
                    objectFit: "contain",
                    margin: "0 16px 16px 0",
                    cursor: "pointer",
                  }}
                  id={post.id}
                  title={post.title}
                  images={post.images}
                  ownMembers={post.ownMembers}
                  content={post.content}
                  type={post.type}
                  isSold={post.isSold}
                ></Card>
              </div>
            )).reverse()}
          </ImageList>
        </CustomTabPanel>
      </div>
    </Container>
  );
};

export default LatestPost;
