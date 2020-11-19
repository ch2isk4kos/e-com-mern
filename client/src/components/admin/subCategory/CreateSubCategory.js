import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from "../../../api/nodejs/categories";
import {
  getSubCategories,
  getCategory,
  createSubCategory,
  deleteSubCategory,
} from "../../../api/nodejs/subCategories";
import AdminNav from "../AdminNav";

const createSubCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  });

  const loadCategories = () => {};

  return (
    <div>
      <h1>Create Sub Category</h1>
    </div>
  );
};
