import Article from "../models/Article.js";

//CREATE - tworzenie artykułu
export const createArticle = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        const article = await Article.create({
            title,
            content,
            category: category || null,
            author: req.user.id, // z authMuddleware
        });

        res.status(201).json({
            message: "Artykuł utworzony",
            article,
        });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

//GET ALL - pobieranie wszystkich artykułów
export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find()
            .populate("author", "email role")
            .populate("category", "name");

        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error});
    }
};

//GET ONE -pobieranie jednego artykułu
export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
            .populate("author", "email role")
            .populate("category", "name");

        if (!article) {
            return res.status(404).json({message: "Artykuł nie istnieje" });
        }

        res.json(article);
      } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error});
    }
};

// UPDATE - edycja artykułu
export const updateArticle = async (req, res) => {
    try {
        const { title, content, category, published } = req.body;

        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: "Artykuł nie istnieje" });
        }

        // tylko autor lub admin może edytować
        if (article.author.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Brak uprawnień" });
        }

        article.title = title ?? article.title;
        article.content = content ?? article.content;
        article.category = category ?? article.category;
        article.published = published ?? article.published

        await article.save();

        res.json({
            message: "Artykuł zaktualizowany",
            article,
        });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

//DELETE - usuwanie artykułu
export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: "Artykuł nie istnieje" });
        }

        //tylko autor lub admin może usuwać
        if (article.author.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Brak uprawnień" });
        }

        await article.deleteOne();

        res.json({ message: "Artykuł usunięty" });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};