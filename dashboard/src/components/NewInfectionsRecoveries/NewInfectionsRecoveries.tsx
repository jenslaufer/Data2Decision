import React, {FC} from "react";
import {Countries} from "../../types/countries";

type Props = {
  country: Countries;
}

const NewInfectionsRecoveries: FC<Props> = ({
    country
                                            }) => {
  return <div>{country}</div>;
};

export default NewInfectionsRecoveries;
