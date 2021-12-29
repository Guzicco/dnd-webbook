/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { ILink } from "../../../../App";
import { API_URL } from "../../../../Globals";

interface EquipmentAccordionProps {
  equipment: ILink;
}

const EquipmentAccordion: React.FC<EquipmentAccordionProps> = ({
  equipment,
}) => {
  const [equipmentData, setEquipmentData] = useState({});
  const fetchEQData = async () => {
    const eqData = await Axios.get(`${API_URL}${equipment.url}`).then(
      (response) => response.data
    );
    return eqData;
  };

  useEffect(() => {}, []);

  console.log(equipmentData);

  return (
    <Accordion key={equipment.index} id={equipment.index}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{equipment.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
          neque sequi non animi expedita molestias, eum voluptatem voluptatibus
          laborum exercitationem illo! Velit aliquid eum cupiditate laudantium,
          doloremque corporis temporibus excepturi!
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default EquipmentAccordion;
