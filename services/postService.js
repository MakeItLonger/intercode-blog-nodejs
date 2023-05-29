import postModel from '../models/postModel.js';
import fileService from './fileService.js';

class PostService {
  async createPost(post, picture) {
    const arrFilesURL = [];
    Array.from(picture).forEach((picture) => {
      const fileName = fileService.saveFile(picture);
      arrFilesURL.push('http://localhost:5000/' + fileName);
    });
    const createdPost = await postModel.create({ ...post, picture: arrFilesURL });
    return createdPost;
  }

  async getAllPosts(queryParams) {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const page = parseInt(queryParams.page) - 1 || 0;
    const limit = parseInt(queryParams.limit) || 5;
    const search = queryParams.search || '';
    const dateStart = queryParams.datestart || startOfYear;
    const dateEnd = queryParams.dateend || String(Date.now());
    let sort = queryParams.sort || 'title';
    let topic = queryParams.topic || '';

    const topicOptions = ['Life style', 'Home', 'Hobby', 'Travel'];

    topic === '' ? (topic = [...topicOptions]) : (topic = queryParams.topic.split(','));
    queryParams.sort ? (sort = queryParams.sort.split(',')) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = 'asc';
    }

    const posts = await postModel
      .find({ title: { $regex: search, $options: 'i' } })
      .where('topic')
      .in([...topic])
      .where('date')
      .gte(dateStart)
      .where('date')
      .lte(dateEnd)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await postModel.countDocuments({
      title: { $regex: search, $options: 'i' },
      topic: { $in: [...topic] },
      date: { $gte: dateStart, $lte: dateEnd },
    });

    return { posts, total };
  }

  async getPost(id) {
    if (!id) {
      throw new Error('ID is required');
      s;
    }

    const post = await postModel.findById(id);

    return post;
  }

  async updatePost(post, picture) {
    if (!post._id) {
      throw new Error('ID is required');
    }

    let updatedPost;

    if (picture) {
      const arrFilesUpdateURL = [];
      Array.from(picture).forEach((picture) => {
        const fileName = fileService.saveFile(picture);
        arrFilesUpdateURL.push('http://localhost:5000/' + fileName);
      });
      updatedPost = await postModel.findByIdAndUpdate(post._id, { ...post, picture: arrFilesUpdateURL }, { new: true });

      const arrFilesURL = [];
      Array.from(picture).forEach((picture) => {
        const fileName = fileService.saveFile(picture);
        arrFilesURL.push('http://localhost:5000/' + fileName);
      });
    } else {
      updatedPost = await postModel.findByIdAndUpdate(post._id, post, { new: true });
    }

    return updatedPost;
  }

  async deletePost(id) {
    if (!id) {
      throw new Error('ID is required');
    }

    const post = await postModel.findByIdAndDelete(id);

    return post;
  }
}

export default new PostService();
