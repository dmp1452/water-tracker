import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color:#5e88c6; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


`;

const StyledDiv = styled.div`
  margin-bottom: 5px
  border: 1px solid #ccc;
  background-color:rgb(137, 180, 243);
  border-radius: 4px;
  padding: 8px;
  `

export const DisplayRecords = ({ records }) => {
  return (
    <StyledContainer>
      <h2>Water Intake Records</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        records.map((record) => (
          <StyledDiv key={record.id}>
            <p>Date: {new Date(record.date_time).toLocaleDateString()}</p>
            <p>Amount: {record.ounces} ml</p>
          </StyledDiv>
        ))
      )}
    </StyledContainer>
  );
};
