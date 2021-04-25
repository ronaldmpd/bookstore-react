const AuthorRepository = require('../repositories/AuthorRepository');

const getAuthors = async (from, limit, filters, attributes) => {
  let defaultFilters = {
    state: true,
  };
    if (!filters) {
      filters = defaultFilters;
    } else {
      filters = { ...defaultFilters, ...filters };
    }
    const { count, rows } = await AuthorRepository.getAuthors(from, limit, filters, attributes);
    return { count, authors: rows };
  };
  
  const getAuthorById = async (id) => {
    return await AuthorRepository.getAuthorById(id);
  };

const addAuthor = async (author) => {
    return await AuthorRepository.addAuthor(author);
};

const updateAuthor = async ({
    authorId,
    name,
    age,
    nationality,    
  }) => {
    const author = await AuthorRepository.updateAuthor({
      authorId,
      name,
      age,
      nationality,      
    });
    return author;
  };

  const deleteAuthor = async (id) => {
    const author = await AuthorRepository.deleteAuthor(id);
    return author;
  };

module.exports = {
    getAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor,
};
