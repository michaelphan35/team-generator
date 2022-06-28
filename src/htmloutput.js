const createdTeam = team => {

    const generateManager = manager => {
        return `<div class = "card employee-info">
                    <div class = "card-header">
                        <h2 class = "card-title">${manager.getName()}(${manager.getRole()})</h2>
                    </div>
                    <div class = "card-body">
                        <ul class = "list group">
                            <li>ID: ${manager.getId()}</li>
                            <li>Email: <a href = "mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                            <li>Office number: ${manager.getOfficeNumber()}</li>
                        </ul>
                    </div>
                </div>`;
    };

    const generateEngineer = engineer => {
        return `<div class = "card employee-info">
                    <div class = "card-header">
                        <h2 class = "card-title">${engineer.getName()}(${engineer.getRole()})</h2>
                    </div>
                    <div class = "card-body">
                        <ul class = "list group">
                            <li>ID: ${engineer.getId()}</li>
                            <li>Email: <a href = "mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                            <li>Github: <a href = "https://github.com/${engineer.getGithub()}" target = "_blank">${engineer.getGithub()}</a></li>
                        </ul>
                    </div>
                </div>`;
        
    };

    const generateIntern = intern => {
        return `<div class = "card employee-info">
                    <div class = "card-header">
                        <h2 class = "card-title">${intern.getName()}(${intern.getRole()})</h2>
                    </div>
                    <div class = "card-body">
                        <ul class = "list group">
                            <li>ID: ${intern.getId()}</li>
                            <li>Email: <a href = "mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                            <li>School: ${intern.getSchool()}</li>
                        </ul>
                    </div>
                </div>`;
        
    };

    const html = [];

    html.push(team
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => generateManager(manager))
    );
    html.push(team
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => generateEngineer(engineer))
    );
    html.push(team
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => generateIntern(intern))
    );

    return html.join("");
}

export default team => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Generator</title>
        <link rel="stylesheet" href="./styles.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    </head>
    <body>
        <header class = "header-container">
            <div class = "row">
                <div class = "col-12 justify-space-between">
                    <h1 class = "text-center">Welcome to your team</h1>
                </div>
            </div>
        </header>
        <div class = "container">
            <div class = "row">
                <div class = "created-team col-12 d-flex justify-content-center">
                    ${createdTeam(team)}
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    };
