import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const API_KEY = "1dce8597e3d9478ba14e118a7896dcd8";
const BASE_URL = "https://newsapi.org/v2/everything";

interface NewsItem {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  url: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: "Indian Law OR Supreme Court of India OR RBI regulations OR SEBI OR Cyber Law OR IT Act OR Constitution of India",
            sortBy: "publishedAt",
            language: "en",
            domains: "barandbench.com,livemint.com,livelaw.in,economictimes.indiatimes.com",
            pageSize: 10,
            apiKey: API_KEY,
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const featuredNews = news.length > 0 ? news[0] : null;
  const regularNews = news.slice(1);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          mb: 2,
          textAlign: "center",
          background: "linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Legal News & Updates
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6, textAlign: "center" }}>
        Stay updated with the latest developments in Indian law and justice
      </Typography>

      {featuredNews && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card sx={{ mb: 6, border: "1px solid rgba(255, 255, 255, 0.2)" }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <CardMedia component="img" height="400" image={featuredNews.urlToImage} alt={featuredNews.title} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ p: 4, display: "flex", flexDirection: "column" }}>
                  <Chip label="Featured" color="primary" sx={{ mb: 2, background: "linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)" }} />
                  <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                    {featuredNews.title}
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    {featuredNews.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(featuredNews.publishedAt).toDateString()} | {featuredNews.source.name}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      href={featuredNews.url}
                      target="_blank"
                      sx={{ background: "linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)" }}
                    >
                      Read Full Story
                    </Button>
                    <Box>
                      <IconButton size="small">
                        <ShareIcon />
                      </IconButton>
                      <IconButton size="small">
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </motion.div>
      )}

      <Grid container spacing={4}>
        {regularNews.map((article, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 12px 24px rgba(0,0,0,0.1)" } }}>
                <CardMedia component="img" height="240" image={article.urlToImage || "https://via.placeholder.com/400"} alt={article.title} />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, minHeight: 64, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {article.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {article.description || "No description available"}
                  </Typography>
                  <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(article.publishedAt).toDateString()}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small">
                        <ShareIcon />
                      </IconButton>
                      <IconButton size="small">
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Button variant="contained" size="large" sx={{ background: "linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)" }}>
          Load More News
        </Button>
      </Box>
    </Container>
  );
};

export default NewsSection;
