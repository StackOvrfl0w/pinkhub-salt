// src/app/products/[categorySlug]/page.js
import React from "react";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import allProducts from "@/data/products.json";
import ProductCard from "@/components/ProductCard"; 
import DividerSection from "@/components/DividerSection";
import CallToAction from "@/components/CallToAction";

const getAllCategorySlugs = () => {
  const slugs = new Set(allProducts.map((p) => p.category));
  return Array.from(slugs);
};

const getCategoryName = (slug) => {
  if (!slug) return "Category";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()); 
};

export async function generateStaticParams() {
  const categorySlugs = getAllCategorySlugs();

  return categorySlugs.map((slug) => ({
    categorySlug: slug, 
  }));
}

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const categoryName = getCategoryName(categorySlug);

  const productsInCategory = allProducts.filter(
    (product) => product.category === categorySlug
  );
  
  if (productsInCategory.length === 0) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${categoryName} | Raqeeb Salt Products`,
    description: `Explore Raqeeb Salt's premium ${categoryName} products. Wholesale and private label available.`,
  };
}

export default async function CategoryPage({ params }) {
  const { categorySlug } = await params; 

  const productsInCategory = allProducts.filter(
    (product) => product.category === categorySlug
  );

  if (productsInCategory.length === 0) {
    notFound();
  }

  const categoryName = getCategoryName(categorySlug);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: categoryName, href: "" }, 
  ];

  return (
    <div>
      <PageBanner
        title={categoryName}
        subtitle={`Browse our complete collection of ${categoryName} products, available for wholesale and private label.`}
        breadcrumbs={breadcrumbs}
        imageUrl="/images/himalayan-salt-bg.jpg"
      />

      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productsInCategory.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <DividerSection />
      <CallToAction />
    </div>
  );
}