"use client";
import React from "react";

function MainComponent() {
  const [selections, setSelections] = React.useState({
    category: null,
    subcategory: null,
    type: null,
    variation: null,
    detail: null,
  });

  // Sample data structure
  const data = {
    Clothing: {
      Men: {
        Shirts: {
          Formal:
            "Premium cotton dress shirts perfect for business meetings and formal occasions. Available in classic white, light blue, and subtle patterns.",
          Casual:
            "Comfortable everyday shirts in various styles including polo, henley, and button-down casual fits.",
        },
        Trousers: {
          Formal:
            "Tailored dress pants in wool and cotton blends, perfect for professional settings.",
          Casual:
            "Relaxed fit jeans, chinos, and casual pants for everyday comfort and style.",
        },
      },
      Women: {
        Dresses: {
          Formal:
            "Elegant evening dresses and professional wear for special occasions and business settings.",
          Casual:
            "Comfortable day dresses, sundresses, and casual wear for everyday activities.",
        },
        Tops: {
          Formal:
            "Professional blouses, blazers, and formal tops for business and formal events.",
          Casual:
            "T-shirts, tank tops, and casual blouses for relaxed, everyday wear.",
        },
      },
    },
    Electronics: {
      Computers: {
        Laptops: {
          Gaming:
            "High-performance gaming laptops with dedicated graphics cards and fast processors for immersive gaming experiences.",
          Business:
            "Professional laptops optimized for productivity, featuring long battery life and enterprise security features.",
        },
        Desktops: {
          Gaming:
            "Powerful desktop computers built for gaming with top-tier graphics cards and cooling systems.",
          Office:
            "Reliable desktop computers perfect for office work, featuring efficient processors and ample storage.",
        },
      },
      Mobile: {
        Smartphones: {
          Android:
            "Latest Android smartphones with advanced cameras, fast processors, and long-lasting batteries.",
          iPhone:
            "Apple's premium smartphones featuring iOS, exceptional build quality, and seamless ecosystem integration.",
        },
        Tablets: {
          Android:
            "Versatile Android tablets perfect for entertainment, productivity, and creative work.",
          iPad: "Apple's tablet lineup offering powerful performance for both professional and personal use.",
        },
      },
    },
    Furniture: {
      "Living Room": {
        Sofas: {
          Sectional:
            "Large sectional sofas perfect for spacious living rooms, offering ample seating and comfort.",
          Loveseat:
            "Compact two-seater sofas ideal for smaller spaces while maintaining style and comfort.",
        },
        Tables: {
          Coffee:
            "Stylish coffee tables that serve as the centerpiece of your living room setup.",
          Side: "Convenient side tables perfect for placing lamps, books, and decorative items.",
        },
      },
      Bedroom: {
        Beds: {
          Queen:
            "Comfortable queen-size beds offering the perfect balance of space and room efficiency.",
          King: "Spacious king-size beds providing maximum comfort and sleeping space for couples.",
        },
        Storage: {
          Dressers:
            "Elegant dressers with multiple drawers for organized clothing and accessory storage.",
          Wardrobes:
            "Spacious wardrobes with hanging space and shelves for complete clothing organization.",
        },
      },
    },
  };

  const handleSelection = (level, value) => {
    const newSelections = { ...selections };

    // Reset subsequent selections when a higher level is changed
    switch (level) {
      case "category":
        newSelections.category = value;
        newSelections.subcategory = null;
        newSelections.type = null;
        newSelections.variation = null;
        newSelections.detail = null;
        break;
      case "subcategory":
        newSelections.subcategory = value;
        newSelections.type = null;
        newSelections.variation = null;
        newSelections.detail = null;
        break;
      case "type":
        newSelections.type = value;
        newSelections.variation = null;
        newSelections.detail = null;
        break;
      case "variation":
        newSelections.variation = value;
        newSelections.detail =
          data[selections.category][selections.subcategory][selections.type][
            value
          ];
        break;
    }

    setSelections(newSelections);
  };

  const getAvailableOptions = (level) => {
    switch (level) {
      case "category":
        return Object.keys(data);
      case "subcategory":
        return selections.category
          ? Object.keys(data[selections.category])
          : [];
      case "type":
        return selections.subcategory
          ? Object.keys(data[selections.category][selections.subcategory])
          : [];
      case "variation":
        return selections.type
          ? Object.keys(
              data[selections.category][selections.subcategory][selections.type]
            )
          : [];
      default:
        return [];
    }
  };

  const renderColumn = (level, title, options, selectedValue) => {
    if (options.length === 0) return null;

    return (
      <div className="flex-shrink-0 w-full md:w-64 bg-white border-r border-gray-200 h-full">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <div className="overflow-y-auto h-full">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelection(level, option)}
              className={`w-full text-left p-3 border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                selectedValue === option
                  ? "bg-blue-100 border-l-4 border-l-blue-500"
                  : ""
              }`}
            >
              <span className="text-gray-700 font-medium">{option}</span>
              {selectedValue === option && (
                <i className="fas fa-chevron-right float-right text-blue-500 mt-1"></i>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderDetailColumn = () => {
    if (!selections.detail) return null;

    return (
      <div className="flex-shrink-0 w-full md:w-80 bg-white h-full">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Details
          </h3>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              {selections.variation} {selections.type}
            </h4>
            <div className="text-sm text-gray-500 mb-4">
              <span>{selections.category}</span>
              <i className="fas fa-chevron-right mx-2"></i>
              <span>{selections.subcategory}</span>
              <i className="fas fa-chevron-right mx-2"></i>
              <span>{selections.type}</span>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{selections.detail}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Catalog</h1>
        <p className="text-gray-600 mt-1">
          Browse through our categories to find what you're looking for
        </p>
      </div>

      {/* Breadcrumb */}
      {(selections.category ||
        selections.subcategory ||
        selections.type ||
        selections.variation) && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center text-sm text-gray-600 overflow-x-auto">
            <button
              onClick={() =>
                setSelections({
                  category: null,
                  subcategory: null,
                  type: null,
                  variation: null,
                  detail: null,
                })
              }
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            {selections.category && (
              <>
                <i className="fas fa-chevron-right mx-2"></i>
                <button
                  onClick={() =>
                    handleSelection("category", selections.category)
                  }
                  className="hover:text-blue-600 transition-colors"
                >
                  {selections.category}
                </button>
              </>
            )}
            {selections.subcategory && (
              <>
                <i className="fas fa-chevron-right mx-2"></i>
                <button
                  onClick={() =>
                    handleSelection("subcategory", selections.subcategory)
                  }
                  className="hover:text-blue-600 transition-colors"
                >
                  {selections.subcategory}
                </button>
              </>
            )}
            {selections.type && (
              <>
                <i className="fas fa-chevron-right mx-2"></i>
                <button
                  onClick={() => handleSelection("type", selections.type)}
                  className="hover:text-blue-600 transition-colors"
                >
                  {selections.type}
                </button>
              </>
            )}
            {selections.variation && (
              <>
                <i className="fas fa-chevron-right mx-2"></i>
                <span className="text-gray-800 font-medium">
                  {selections.variation}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)] overflow-hidden">
        <div className="flex overflow-x-auto md:overflow-x-visible w-full">
          {/* Column A - Categories */}
          {renderColumn(
            "category",
            "Categories",
            getAvailableOptions("category"),
            selections.category
          )}

          {/* Column B - Subcategories */}
          {selections.category &&
            renderColumn(
              "subcategory",
              "Subcategories",
              getAvailableOptions("subcategory"),
              selections.subcategory
            )}

          {/* Column C - Types */}
          {selections.subcategory &&
            renderColumn(
              "type",
              "Types",
              getAvailableOptions("type"),
              selections.type
            )}

          {/* Column D - Variations */}
          {selections.type &&
            renderColumn(
              "variation",
              "Variations",
              getAvailableOptions("variation"),
              selections.variation
            )}

          {/* Column E - Details */}
          {selections.variation && renderDetailColumn()}
        </div>
      </div>

      {/* Mobile Instructions */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg">
        <div className="flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          <span className="text-sm">
            Swipe horizontally to navigate between columns
          </span>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;