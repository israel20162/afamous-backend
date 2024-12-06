function ToggleNav() {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main")
  const navbar = document.getElementById("navbar")
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px';
    main.style.marginLeft = '0px'
    navbar.style.marginLeft = '0px'
  } else {
    sidebar.style.left = '0px';
    main.style.marginLeft = '250px'
    navbar.style.marginLeft = '250px'
  }

  console.log('close')
}

