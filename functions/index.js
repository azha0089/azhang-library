// ✅ index.js （适配 Node.js 22 / v2 Functions）
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore(); // 初始化 Firestore

// ✅ countBooks 函数
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection("books").get();
      res.json({ count: snapshot.size });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error counting books");
    }
  });
});

// ✅ capitalizeBook 函数（自动大写）
exports.capitalizeBook = onDocumentWritten("books/{bookId}", async (event) => {
  const bookId = event.params.bookId;
  const afterData = event.data?.after?.data();

  if (!afterData) return null;

  const title = afterData.title;
  const author = afterData.author;

  // 已经是大写则跳过
  if (title === title.toUpperCase() && author === author.toUpperCase()) return null;

  await db.collection("books").doc(bookId).update({
    title: title.toUpperCase(),
    author: author.toUpperCase(),
  });

  console.log(`✅ Capitalized book: ${bookId}`);
  return null;
});

exports.counter = onRequest((req, res) => {
  cors(req, res, async () => {
    const ref = db.collection("counters").doc("visitCount");
    try {
      await db.runTransaction(async (t) => {
        const doc = await t.get(ref);
        if (!doc.exists) {
          t.set(ref, { count: 1 });
        } else {
          const newCount = doc.data().count + 1;
          t.update(ref, { count: newCount });
        }
      });

      const updated = await ref.get();
      res.json({ count: updated.data().count });
    } catch (error) {
      console.error("Error updating counter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

  });
});

// ✅ GetAllBookAPI - 返回所有 books 数据
exports.GetAllBookAPI = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get();
      const books = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.json(books);
    } catch (error) {
      console.error("Error getting books:", error);
      res.status(500).send("Error retrieving books");
    }
  });
});

