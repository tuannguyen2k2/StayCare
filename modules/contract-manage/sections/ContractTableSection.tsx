import { SearchBar } from "@/common/components/searchbar";
import { IContract } from "@/interfaces/contract.interface";
import ContractDataTable from "../components/ContractDataTable";
import { Box } from "@mui/material";
import { contract } from "@/clientApi/contract";

const contracts: IContract[] = [
  {
    id: 1,
    typeOfRoom: "Single",
    packageName: "Standard",
    price: 100,
    status: 1,
    startDate: "2022-10-10",
    dueDate: "2023-10-10",
  },
  {
    id: 2,
    typeOfRoom: "Double",
    packageName: "Premium",
    price: 200,
    status: 2,
    startDate: "2022-10-10",
    dueDate: "2023-10-10",
  },
  {
    id: 3,
    typeOfRoom: "Single",
    packageName: "Standard",
    price: 100,
    status: 3,
    startDate: "2022-10-10",
    dueDate: "2023-10-10",
  },
  {
    id: 4,
    typeOfRoom: "Double",
    packageName: "Premium",
    price: 200,
    status: 1,
    startDate: "2022-10-10",
    dueDate: "2023-10-10",
  },
  {
    id: 5,
    typeOfRoom: "Single",
    packageName: "Standard",
    price: 100,
    status: 2,
    startDate: "2022-10-10",
    dueDate: "2023-10-10",
  },
  {
    id: 6,
    typeOfRoom: "Double",
    packageName: "Premium",
    price: 200,
    status: 3,
    startDate: "2022-10-10",
    dueDate: "2023-10-10",
  },
];

// const ContractTableSection = () => {
async function ContractTableSection() {
  const data = await contract.getListContract();

  return (
    <>
      <Box width="100%" mb={5} display="flex" justifyContent="end">
        <SearchBar />
      </Box>
      <ContractDataTable data={(data.payload as any).data} />
    </>
  );
}

export default ContractTableSection;
