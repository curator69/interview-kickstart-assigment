import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const SearchAndFilter = ({ webinars, setWebinars }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const filteredWebinars = webinars.map((webinar) => {
      let isFiltered = true;

      if (filter === "all") {
        isFiltered = true;

        if (!search.length) {
          isFiltered = true;
        } else if (!webinar.instructorName.includes(search)) {
          isFiltered = false;
        }
      } else if (webinar.topics !== filter) {
        isFiltered = false;

        if (!search.length) {
          isFiltered = true;
        } else if (!webinar.instructorName.includes(search)) {
          isFiltered = false;
        }
      }

      return { ...webinar, isFiltered };
    });
    setWebinars(filteredWebinars);
  }, [search, filter]);

  return (
    <div className="flex items-center justify-between w-full">
      <Search setSearch={setSearch} />
      <Filter webinars={webinars} setFilter={setFilter} />
    </div>
  );
};

export default SearchAndFilter;

const Search = ({ setSearch }) => {
  return (
    <div className="flex items-center justify-between gap-2 w-fit border-[1px] border-solid border-[#E3E7EC] rounded-lg p-2 h-[56px]">
      <Image
        src="./icons/searchIcon.svg"
        alt="search icon"
        width={20}
        height={20}
      />
      <input
        type="text"
        placeholder="Search for webinar"
        className="outline-none w-[300px]"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const Filter = ({ webinars, setFilter }) => {
  const topics = webinars.map((webinar) => webinar.topics);

  return (
    <>
      <FormControl className="!w-[300px]">
        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Topic"
          defaultValue="all"
          className="rounded-lg"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="all">All topics</MenuItem>
          {topics.map((topic, index) => (
            <MenuItem key={index} value={topic}>
              {topic}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
