import React from "react";
import Chart from "react-apexcharts";
import PropTypes from 'prop-types';
import './UserCard.css';
const XpChart = ({xp_view}) => {
  //here we are dierctly taking the array so we just need to map
  if (!xp_view || xp_view.length === 0) {
    return <div>Loading...</div>;;
  }
  //item each object or element in map
    const data = xp_view.map((item) => item.amount);
    const categories = xp_view.map((item) => {
        const parts = item.path.split("/");
        return parts[parts.length - 1];
    })
    const options = { //type of chart . react apex wrapper
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      title: {
        text: 'Projects You Finished'
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
      },
    };
  
    const series = [ //series is for data
      {
        name : 'XP amount' , //this gives each data a name
        data: data ,
      },
    ];

      return(
        <div>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
      )
}


const SkillPie = ({transaction}) => {
  const skillList = {
    labels : [
       'Go', // index 0
       'JavaScript', // index 1
       'HTML', // index 2
       'C', // index 3
       'SQL', // index 4 etc
       'CSS',
       'Unix', 
       'Docker',
       'Rust',
       'Shell',
       'PHP', 
       'Python',
       'Ruby',
       'C++', 
       'GraphQL',
       'Ruby on Rails',
       'Laravel',
       'Django',
       'Electron', 
       'Git'
    ],
    values : new Array(20).fill(0)
  }
  transaction.forEach((item) => {
    if (item.type === 'skill_go'){
      skillList.values[0] = Math.max(skillList.values[0],item.amount)
    } else if (item.type === 'skill_js'){
      skillList.values[1] = Math.max(skillList.values[1],item.amount)
    }else if (item.type === 'skill_html'){
      skillList.values[2] = Math.max(skillList.values[2],item.amount)
    }else if (item.type === 'skill_c'){
      skillList.values[3] = Math.max(skillList.values[3],item.amount)
    }else if (item.type === 'skill_sql'){
      skillList.values[4] = Math.max(skillList.values[4],item.amount)
    }else if (item.type === 'skill_css'){
      skillList.values[5] = Math.max(skillList.values[5],item.amount)
    }else if (item.type === 'skill_unix'){
      skillList.values[6] = Math.max(skillList.values[6],item.amount)
    }else if (item.type === 'skill_docker'){
      skillList.values[7] = Math.max(skillList.values[7],item.amount)
    }else if (item.type === 'skill_rust'){
      skillList.values[8] = Math.max(skillList.values[8],item.amount)
    }else if (item.type === 'skill_shell'){
      skillList.values[9] = Math.max(skillList.values[9],item.amount)
    }else if (item.type === 'skill_php'){
      skillList.values[10] = Math.max(skillList.values[10],item.amount)
    }else if (item.type === 'skill_python'){
      skillList.values[11] = Math.max(skillList.values[11],item.amount)
    }else if (item.type === 'skill_ruby'){
      skillList.values[12] = Math.max(skillList.values[12],item.amount)
    }else if (item.type === 'skill_cpp'){
      skillList.values[13] = Math.max(skillList.values[13],item.amount)
    }else if (item.type === 'skill_graphql'){
      skillList.values[14] = Math.max(skillList.values[14],item.amount)
    }else if (item.type === 'skill_ruby_on_rails'){
      skillList.values[15] = Math.max(skillList.values[15],item.amount)
    }else if (item.type === 'skill_laravel'){
      skillList.values[16] = Math.max(skillList.values[16],item.amount)
    }else if (item.type === 'skill_django'){
      skillList.values[17] = Math.max(skillList.values[17],item.amount)
    }else if (item.type === 'skill_electron'){
      skillList.values[18] = Math.max(skillList.values[18],item.amount)
    }else if (item.type === 'skill_git'){
      skillList.values[19] = Math.max(skillList.values[19],item.amount)
    }
  })


  var options = {
    chart: {
    height: 350,
    type: 'radar',
  },
  title: {
    text: 'Programming Skills' ,
  },
  yaxis: {
    stepSize: 20,
  },
  xaxis: {
    categories: skillList.labels ,
  }
  };
  const series = [ //series is for data
    {
      name: '%',
      data: skillList.values,
    },
  ];


  return (<div>
    <Chart options={options} series={series} type="radar" height={350} />
          </div>)
}
//it is an array of objects! u need to map through it first to get values
const TopCard = ({data , cohort}) => {
  const filteredData = data.filter((item)=> item.eventId === cohort)
  const toplevel = filteredData.map((item) => item.level).slice(0,10);
  const topnames = filteredData.map((item) => item.userLogin).slice(0,10);
  return (
    <div className="top-cohort-container">
      <h2>top 10 in your cohort</h2>
     <ol>
  {topnames.map((name, index) => (
    <li key={index}>
      <span>{name}</span> Level: {toplevel[index]}
    </li>
  ))}
</ol>
    </div>
  );
}


const UserCard = ({data}) => {
  //since user is an array , u can do this or data.user[0]
  const user = data.user && data.user.length > 0 ? data.user[0] : null;
  if (!user) {
    return <p>No user data available.</p>;
  }

  const level = data.event_user
  let userLevel = null;
  let cohort = null;
  let userEvent = null;
  level.forEach(obj => {
    if (obj.userLogin == user.login) {
      userLevel = obj.level;
      if (obj.eventId == 20){
        cohort = '1';
        userEvent = 20;
      } else if (obj.eventId == 72) {
        cohort = '2';
        userEvent = 72;
      } else if (obj.eventId == 250){
        cohort = '3';
        userEvent = 250;
      }
    }
     
  })

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    window.location.reload(); // Reload the page or redirect to login
  };

  const ratio = user.auditRatio.toFixed(2)

return (
    <div className="container">
      <div className="card">
        <h2>Welcome {user.firstName} {user.lastName}</h2>
        <p><b>you are in</b> <strong>Cohort {cohort}</strong></p>
        <p><b>Email :</b> {user.email}</p>
        <p><b>username :</b> {user.login}</p>
        <p><b>Current Level </b>{userLevel}</p>
        <p><b>Audit Ratio :</b> <strong>{ratio}</strong></p>
        <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="card xpChart"><XpChart xp_view={data.xp_view} /></div>
        <div className="card skillPie"><SkillPie transaction={data.transaction}/></div>
        <div className="card Top"><TopCard data={data.event_user} cohort={userEvent}/></div>
    </div>
)
}

TopCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      eventId: PropTypes.number.isRequired,
      level: PropTypes.number.isRequired,
      userLogin: PropTypes.string.isRequired,
    })
  ).isRequired,
  cohort: PropTypes.string.isRequired,
};

SkillPie.propTypes = {
  transaction: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

XpChart.propTypes = {
  xp_view: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

UserCard.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        auditRatio: PropTypes.number.isRequired,
      })
    ).isRequired,
    event_user: PropTypes.arrayOf(
      PropTypes.shape({
        userLogin: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        eventId: PropTypes.number.isRequired,
      })
    ).isRequired,
    xp_view: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired,
      })
    ).isRequired,
    transaction: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default UserCard;