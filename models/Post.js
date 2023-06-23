const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    gambar: {
      type: String,
      required: true
    },
    nama: {
      type: String,
      required: true,
    },
    umur: {
      type: Number,
      required: true,
    },
    jabatan: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
      required: false,
    },
    created_date: {
      type: Date,
      default: Date.now
    },
    modified_date: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", postSchema, "post");
