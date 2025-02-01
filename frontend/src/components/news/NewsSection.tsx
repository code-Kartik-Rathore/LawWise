import React, { useState } from "react";
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

interface NewsItem {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  url: string;
}

// Static news data
const staticNewsData: NewsItem[] = [
  {
    title: "Supreme Court Upholds Constitutional Validity of Electoral Bonds Scheme",
    description: "In a landmark judgment, the Supreme Court examines the transparency in political funding through electoral bonds, addressing concerns about anonymous donations and their impact on democratic processes.",
    urlToImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
    publishedAt: "2024-02-01",
    source: { name: "Law Weekly" },
    url: "#"
  },
  {
    title: "New Data Protection Bill Introduces Stricter Compliance Measures",
    description: "The Digital Personal Data Protection Act 2024 sets new standards for data handling and privacy protection, affecting both domestic and international companies operating in India.",
    urlToImage: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3",
    publishedAt: "2024-01-30",
    source: { name: "Tech Law Journal" },
    url: "#"
  },
  {
    title: "RBI Announces New Framework for Digital Lending",
    description: "The Reserve Bank of India introduces comprehensive guidelines for digital lending platforms, aimed at protecting consumers and regulating the fintech sector.",
    urlToImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3",
    publishedAt: "2024-01-28",
    source: { name: "Financial Law Review" },
    url: "#"
  },
  {
    title: "Major Reforms in Company Law to Ease Business Operations",
    description: "Ministry of Corporate Affairs announces significant changes to the Companies Act, simplifying compliance requirements for startups and small businesses.",
    urlToImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3",
    publishedAt: "2024-01-25",
    source: { name: "Corporate Law Times" },
    url: "#"
  },
  {
    title: "Supreme Court Issues Guidelines on Environmental Impact Assessment",
    description: "New guidelines mandate stricter environmental clearance processes for infrastructure projects, emphasizing sustainable development.",
    urlToImage: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3",
    publishedAt: "2024-01-22",
    source: { name: "Environmental Law Report" },
    url: "#"
  },
  {
    title: "Landmark Judgment on Right to Privacy in Digital Age",
    description: "Supreme Court expands the scope of privacy rights in relation to digital surveillance and data collection by government agencies.",
    urlToImage: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3",
    publishedAt: "2024-01-20",
    source: { name: "Digital Rights Review" },
    url: "#"
  },
  {
    title: "New Labor Codes Implementation Timeline Announced",
    description: "Government sets deadline for implementing the four labor codes, bringing significant changes to employment laws and workplace regulations.",
    urlToImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3",
    publishedAt: "2024-01-18",
    source: { name: "Labor Law Journal" },
    url: "#"
  },
  {
    title: "SEBI Introduces New Rules for Market Trading",
    description: "Securities and Exchange Board of India implements new regulations for algorithmic trading and market surveillance.",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3",
    publishedAt: "2024-01-15",
    source: { name: "Securities Law Bulletin" },
    url: "#"
  },
  {
    title: "Reforms in Medical Education Regulations",
    description: "National Medical Commission announces major changes in medical education policies, affecting both institutions and students.",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3",
    publishedAt: "2024-01-12",
    source: { name: "Healthcare Law Review" },
    url: "#"
  },
  {
    title: "New Guidelines for E-commerce Platforms",
    description: "Government issues revised guidelines for e-commerce entities, focusing on consumer protection and fair business practices.",
    urlToImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3",
    publishedAt: "2024-01-10",
    source: { name: "E-commerce Law Today" },
    url: "#"
  },
  {
    title: "Cryptocurrency Regulation Framework Proposed",
    description: "Finance Ministry releases draft framework for regulating cryptocurrency transactions and digital assets in India.",
    urlToImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3",
    publishedAt: "2024-01-08",
    source: { name: "Crypto Law Insider" },
    url: "#"
  },
  {
    title: "Supreme Court on Gender Equality in Workplace",
    description: "Landmark judgment addresses workplace discrimination and harassment, setting new precedents for gender equality.",
    urlToImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
    publishedAt: "2024-01-05",
    source: { name: "Gender Law Review" },
    url: "#"
  },
  {
    title: "Real Estate Regulation Act Amendments",
    description: "New amendments to RERA aim to strengthen homebuyer protection and regulate real estate sector more effectively.",
    urlToImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3",
    publishedAt: "2024-01-03",
    source: { name: "Real Estate Law Weekly" },
    url: "#"
  },
  {
    title: "AI Governance Framework Released",
    description: "Government releases comprehensive framework for artificial intelligence governance and ethical AI development.",
    urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3",
    publishedAt: "2024-01-01",
    source: { name: "Technology Law Report" },
    url: "#"
  },
  {
    title: "Updates to Intellectual Property Rights Laws",
    description: "Major revisions to patent and copyright laws to address modern technological challenges and innovation.",
    urlToImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
    publishedAt: "2023-12-29",
    source: { name: "IP Law Review" },
    url: "#"
  }
];

const NewsSection = () => {
  const [visibleNews, setVisibleNews] = useState<number>(5);

  const loadMore = () => {
    setVisibleNews(prev => Math.min(prev + 5, staticNewsData.length));
  };

  const featuredNews = staticNewsData[0];
  const regularNews = staticNewsData.slice(1, visibleNews);

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
                      sx={{
                        background: "linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #4338CA 0%, #BE185D 100%)",
                        },
                      }}
                    >
                      Read More
                    </Button>
                    <Box>
                      <IconButton>
                        <ShareIcon />
                      </IconButton>
                      <IconButton>
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
        {regularNews.map((item, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" height="200" image={item.urlToImage} alt={item.title} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(item.publishedAt).toDateString()} | {item.source.name}
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    href={item.url}
                    target="_blank"
                    size="small"
                  >
                    Read More
                  </Button>
                  <Box>
                    <IconButton size="small">
                      <ShareIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <BookmarkBorderIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {visibleNews < staticNewsData.length && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={loadMore}
            sx={{
              background: "linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #4338CA 0%, #BE185D 100%)",
              },
            }}
          >
            Load More Articles
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default NewsSection;
