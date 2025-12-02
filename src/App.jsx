import React, { useState } from 'react';
import { Book, Plus, Trash2, Search, Library, Save } from 'lucide-react';

const LibraryApp = () => {
  // Mô phỏng cơ sở dữ liệu sách (State)
  const [books, setBooks] = useState([
    { id: 1, title: "Lập trình C++ căn bản", author: "Nguyễn Văn A", year: 2020 },
    { id: 2, title: "Cấu trúc dữ liệu và giải thuật", author: "Trần Thị B", year: 2021 },
    { id: 3, title: "Có hai con mèo ngồi bên cửa sổ", author: "Nguyễn Nhật Ánh", year: 2012 },
  ]);

  const [newBook, setNewBook] = useState({ title: '', author: '', year: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.year) return;
    const bookToAdd = {
      id: Date.now(), // Tạo ID giả lập
      title: newBook.title,
      author: newBook.author,
      year: parseInt(newBook.year)
    };
    setBooks([...books, bookToAdd]);
    setNewBook({ title: '', author: '', year: '' });
  };
  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };
  // Lọc sách theo từ khóa tìm kiếm
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between border-l-4 border-blue-600">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Library className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Quản Lý Thư Viện</h1>
              <p className="text-slate-500 text-sm">Hệ thống quản lý sách (Mô phỏng Giao diện)</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-blue-600">Tổng số sách: {books.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Form Thêm Sách (Cột trái) */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-600" /> Thêm Sách Mới
              </h2>
              <form onSubmit={handleAddBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Tên sách</label>
                  <input
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Nhập tên sách..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Tác giả</label>
                  <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Nhập tên tác giả..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Năm xuất bản</label>
                  <input
                    type="number"
                    value={newBook.year}
                    onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="2023"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Save className="w-4 h-4" /> Lưu sách
                </button>
              </form>
            </div>
          </div>

          {/* Danh sách Sách (Cột phải) */}
          <div className="md:col-span-2 space-y-4">
            
            {/* Thanh tìm kiếm */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sách theo tên hoặc tác giả..."
                className="w-full bg-transparent border-none focus:outline-none text-slate-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
                      <th className="p-4 font-semibold">Tên Sách</th>
                      <th className="p-4 font-semibold hidden sm:table-cell">Tác giả</th>
                      <th className="p-4 font-semibold w-24">Năm</th>
                      <th className="p-4 font-semibold w-20 text-center">Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-blue-50 transition group">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 p-2 rounded text-blue-600">
                                <Book className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800">{book.title}</p>
                                <p className="text-xs text-slate-500 sm:hidden">{book.author}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-slate-600 hidden sm:table-cell">{book.author}</td>
                          <td className="p-4 text-slate-600">{book.year}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition"
                              title="Xóa sách"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-slate-500">
                          Không tìm thấy cuốn sách nào phù hợp.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryApp;