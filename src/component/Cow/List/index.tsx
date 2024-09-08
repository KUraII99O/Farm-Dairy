import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { ManageCowContext } from "../Provider";
import ItemDetailDrawer from "../ItemDatils";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import CowList from "../Table";

interface Cow {
  id: string,
  image: string,
  userId: string,
  animal: string,
  buyDate: string,
  stallNumber: string,
  buyingPrice: string,
  dateAdded: string,
  pregnantStatus: string,
  milkPerDay: string,
  status: boolean,
  gender: string,
  informations: {
    stallNumber: string,
    dateOfBirth: string,
    animalAgeDays: string,
    weight: string,
    height: string,
    color: string,
    numOfPregnant: string,
    nextPregnancyApproxTime: string,
    buyFrom: string,
    prevVaccineDone: string,
    note: string,
    createdBy: string,
  },
  vaccinations: {
    BDV: boolean,
    PI3: boolean,
    BRSV: boolean,
    BVD: boolean,
    VitaminA: boolean,
    Anthrax: boolean,
  },
};

const AnimalList: React.FC = () => {
  const { cows, deleteCow, toggleCowStatus } = useContext(ManageCowContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [, setIsDeleting] = useState(false);
  const [selectedCow, setSelectedCow] = useState<Cow | null>(null);
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";
  const location = useLocation();
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();

  useEffect(() => {
    if (query.get("result") === "success") {
      toast.success("Milk Entry Added successfully!");
      navigate(location.pathname, { replace: true });
    }
  }, [query, location.pathname, navigate]);

  const handleSort = (fieldName: string) => {
    if (sortBy === fieldName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(fieldName);
      setSortOrder("asc");
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const filteredCows = cows.filter((cow: Cow) =>
    Object.values(cow).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedCows = sortBy
    ? filteredCows.slice().sort((a: Cow, b: Cow) => {
        const aValue = a[sortBy as keyof Cow];
        const bValue = b[sortBy as keyof Cow];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredCows;

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this cow?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteCow(id);
      setIsDeleting(false);
      toast.success("Cow deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting cow.");
    }
  };

  const handleViewDetails = (cow: Cow) => {
    setSelectedCow(cow);
  };

  const handleDrawerClose = () => {
    setSelectedCow(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center"></div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder={translate("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 ml-2"
          />
          <Link
            to="/Add-cow"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addNew")}
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        {translate("cowlist")}
      </h1>
      <CowList
        currentCows={sortedCows}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleViewDetails={handleViewDetails}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
        toggleCowStatus={toggleCowStatus}
        itemsPerPage={5} // Update this value if necessary
        handleToggleStatus={function (): void {
          throw new Error("Function not implemented.");
        } }      />
      {selectedCow && (
        <ItemDetailDrawer
          isOpen={true}
          onClose={handleDrawerClose}
          cow={selectedCow}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AnimalList;
