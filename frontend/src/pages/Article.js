import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

import {
  Paper,
  Typography,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => setArticle(res.data));
  }, [id]);

  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <Paper elevation={3} className="p-8 w-full max-w-3xl">
        <Typography variant="h3" className="font-bold mb-4">
          {article.title}
        </Typography>

        {article.category && (
          <Chip
            label={article.category.name}
            color="primary"
            className="mb-4"
          />
        )}

        <Divider className="my-4" />

        <Typography variant="body1" className="leading-relaxed text-gray-800">
          {article.content}
        </Typography>

        {article.author && (
          <Typography
            variant="subtitle2"
            className="text-gray-500 mt-6 italic"
          >
            Autor: {article.author.email}
          </Typography>
        )}
      </Paper>
    </div>
  );
}

export default Article;
