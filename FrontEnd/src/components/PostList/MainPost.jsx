import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Card from "../../components/UI/Card";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
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
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PAGE_SIZE = 5; // 페이지당 표시할 카드 수

export default function BasicTabs({ isPreview }) {
  const [value, setValue] = useState(0);
  const [visibleCards, setVisibleCards] = useState(PAGE_SIZE);
  const posts = useSelector((state) => (state.post ? state.post.posts : []));
  const searchs = useSelector((state) =>
    state.search ? state.search.searchs : []
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Infinity scroll을 적용할 때 추가된 부분
  const visiblePosts = isPreview
    ? posts.slice(0, PAGE_SIZE)
    : posts.slice(0, visibleCards);

  return (
    <div sx={{ width: "100%" }}>
      <div>
        값 전달 확인용 :{" "}
        {searchs.length > 0 && (
          <>
            {searchs[0].ownMembers} {searchs[0].targetMembers}{" "}
            {searchs[0].cardTydive}
          </>
        )}
      </div>
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
        <div
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        >
          {visiblePosts
            .filter((post) => post.type === "교환")
            .map((post, index) => (
              <Card
                key={post.id}
                style={{
                  width: "calc(50% - 8px)",
                  marginRight: "16px",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
                id={post.id}
                title={post.title}
                images={post.images}
                ownMembers={post.ownMembers}
                targetMembers={post.targetMembers}
                content={post.content}
                type={post.type}
              ></Card>
            ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        >
          {visiblePosts
            .filter((post) => post.type === "판매")
            .map((post, index) => (
              <Card
                key={post.id}
                style={{
                  width: "calc(50% - 8px)",
                  marginRight: "16px",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
                id={post.id}
                title={post.title}
                images={post.images}
                content={post.content}
                ownMembers={post.ownMembers}
                type={post.type}
              ></Card>
            ))}
        </div>
      </CustomTabPanel>
    </div>
  );
}
