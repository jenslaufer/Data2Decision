import React, {FC} from "react";

type Props = {
    percentage: number;
    title: string;
}

const PeopleMeter: FC<Props> = ({
    percentage,
    title,
                                }) => {
    const redPeople = [];
    const absoluteInfected = Math.floor(percentage * 10);
    for (let i = 0; i < absoluteInfected; i ++) {
        redPeople.push(
            <i className="fas fa-user"/>
        )
    }
    const normalPeople = [];
    for (let i = 0; i < 10 - redPeople.length; i ++) {
        normalPeople.push(
            <i className="fas fa-user"/>
        )
    }

    const displayPercentage = Math.floor(percentage * 100);

    return (
        <div>
            <span style={{fontWeight: "bold"}}>{title}</span> <span style={{color: "grey"}}>{displayPercentage}%</span>
            <div style={{fontSize: "2.5rem"}}>
                <span style={{color: "red"}}>
                    { redPeople }
                </span>
                <span>
                    { normalPeople }
                </span>
            </div>
        </div>
    )
};

export default PeopleMeter;