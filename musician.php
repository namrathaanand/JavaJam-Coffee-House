<?php
//echo "Connecting to database <br>";
$hostname="localhost";
$username="root";
$password="";
$databaseName="musicians";
$dbConnected=mysql_connect($hostname,$username,$password);
$dbSelected=mysql_select_db($databaseName,$dbConnected);

if($dbConnected)
{
    //echo "MySQL is connected";
    //echo "<br><br>";
    
    if($dbSelected)
    {
        //echo "Database Musicians connected <br><br>";
        $month=$_POST["months"];
        if($month==0)
        {
            header('Location:index.html');
        }
        else
        {
        $query="select m.Name, m.Genre, p.MonthYear from musician m NATURAL JOIN performance p where MONTH(p.MonthYear)=".$month;
        $result=mysql_query($query);
        
        $index=1;
        echo '<table style="padding-left: 10px; text-align: center; padding-right: 10px">';
        echo "<tr>";
        echo "<th> Name </th>";
        echo "<th> Genre </th>";
        echo "<th> Date </th>";
        echo "</tr>";
        
        
        while($row=mysql_fetch_array($result,MYSQL_ASSOC))
        {
            echo "<tr>";
            echo "<td>"."<a href='artistdetails.html?name=".$row['Name']."'>".$row['Name']."</a>"."</td>";
            echo "<td>". $row['Genre']."</td>";
            echo "<td>". $row['MonthYear']."</td>";
            echo "</tr>";
            
            
            $index++;
            
        }
        echo "</table>";
        echo "<br><strong>Note:</strong> PLease click on artist's Name to get more details about them.";
        mysql_free_result($result);
        }
        
    }
    else
    {
         echo "Musicians Databse connection failed <br><br>";
    }
}
else
{
    echo "MySQL connection failed";
}

    
?>