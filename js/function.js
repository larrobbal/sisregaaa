/*
Autor: Luis Roberto Valencia Briseño
Matricula: 2133004076
Proyecto terminal: SISREGAAA
*/

//Funciones ejecutadas en la carga de los documentos HTML
function loadHome()
{
	loadNavBar();
	loadAsesorias('home');
	loadAlumnos();
	checkPeriodo();
}
function loadAddAsesoria()
{
	loadSalones();
	document.getElementById('nombreMateria').addEventListener("keyup", function(event){searchMateria(event)});
	checkPeriodo();
}

function loadAddAsesor()
{
	document.getElementById('carrera').addEventListener("keyup", function(event){searchCarreras(event)});
}

function loadLinkAlumno()
{
	fillAlumnoList(document.getElementById('alumno-list'));
	getURLIdAsesoria();
}

function loadLinkMateria()
{
	document.getElementById('calificacion').value = 0;
	getURLParamsExamen();
	loadEstatusMateria();
}
function loadAsesoria()
{
	loadNavBar();
	hideDiv('asesorias');
	checkPeriodo();
}
function loadAlumno()
{
	loadNavBar();
	hideDiv('alumnos');
	checkPeriodo();
}
function loadAsesor()
{
	loadNavBar();
	hideDiv('asesores');
	checkPeriodo();
}
function loadListas()
{
	loadNavBar();
	loadAsesorias('listas');
	hideDiv('listas');
	checkPeriodo();
}
function loadReportes()
{
	loadNavBar();
	fillAlumnoList(document.getElementById('listSelectAlumno'));
	checkPeriodo();
}
//Carga de la barra de navegación para cada página web
function loadNavBar()
{
	var divNav = document.getElementById('navBar');
	var xhr = new XMLHttpRequest();
	xhr.open('GET','navBar.php',true);
	xhr.send();
	xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status == 200) 
        {
			divNav.innerHTML = this.responseText;
        }
    };
}

/*=====FUNCIONES DE CARGA DE INFORMACIÓN=====*/
//Carga asesorías para la pantalla principal del sistema
function loadAsesorias(value)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	if(value=='home')
	{
		var divTab = document.getElementById('listAsesoria');
		var tabla = document.createElement('TABLE');
		tabla.setAttribute('class','asesT');
		tabla.setAttribute('id','asesorias');
		var tableBody = document.createElement('TBODY');
		tableBody.setAttribute('id','asesoriaData');
		tabla.appendChild(tableBody);
		var heading = new Array();
		heading[0] = "Id. Asesoría";
		heading[1] = "Materia";
		heading[2] = "Asesor";
		heading[3] = "Salón";
		heading[4] = "Edificio";
		heading[5] = "Horario";

		var datos = new Array();
		var temp = new Array();

		var data = {};
		data['identificador']=2;
		var json_string = JSON.stringify(data);
		xhr.open('POST',"VOAsesoria.php",true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);

		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				myObj = JSON.parse(this.responseText);
				for(var i = 0;i<myObj.length;i++)
				{
					temp[0] = myObj[i].idAsesoria;
					temp[1] = myObj[i].nombreMateria;
					temp[2] = myObj[i].nombreAses;
					temp[3] = myObj[i].salon;
					temp[4] = myObj[i].edificioSalon;
					temp[5] = myObj[i].horarioAsesoria;
					datos[i] = new Array(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]);
				}
				var tr = document.createElement('TR');
				tableBody.appendChild(tr);
				for(var j = 0;j<heading.length;j++)
				{
					var th = document.createElement('TH');
					th.appendChild(document.createTextNode(heading[j]));
					th.setAttribute('id','columna'+j);
					tr.appendChild(th);
				}
				//FILAS DE LA TABLA
				for (i = 0; i < datos.length; i++) 
				{
					var tr = document.createElement('TR');
					for (j = 0; j < datos[i].length; j++) 
					{
						var td = document.createElement('TD')
						td.appendChild(document.createTextNode(datos[i][j]));
						tr.appendChild(td);
					}
					tableBody.appendChild(tr);

				}
				tableBody.appendChild(tr);
				divTab.appendChild(tabla);
				var head = document.getElementById("asesorias").createCaption();
				head.innerHTML = '<a class="tabTit">Asesorias actuales</a>';
			}
		};
	}
	else if(value=='listas')
	{
		selectAsesoria=document.getElementById('select-asesoria');
		var datos = new Array();
		var temp = new Array();
		var data = {};
		data['identificador']=2;
		var json_string = JSON.stringify(data);
		xhr.open('POST',"VOAsesoria.php",true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);

		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				myObj = JSON.parse(this.responseText);
				for(var i = 0;i<myObj.length;i++)
				{
					temp[0] = myObj[i].idAsesoria;
					temp[1] = myObj[i].nombreMateria;
					
					datos[i] = new Array(temp[0],temp[1]);
				}

				for(i=0;i<datos.length;i++)
				{
					var opt = document.createElement('option');
					var cad=""+datos[i][1];
					opt.value=datos[i][0];
					opt.innerHTML=cad;
					selectAsesoria.appendChild(opt);
				}
			}
		};
	}
}

//Carga los alumnos activos para la página de inicio de la aplicación 
function loadAlumnos()
{
	var xhr = new XMLHttpRequest();
	var txt = "", nom="";
	var myObj;
	var divTab = document.getElementById('listaAlumn');
	var tabla = document.createElement('TABLE');
	tabla.setAttribute('class','alumnT');
	tabla.setAttribute('id','alumnos');
	var tableBody = document.createElement('TBODY');
	tabla.appendChild(tableBody);
	var heading = new Array();
    heading[0] = "Id. Alumno";
    heading[1] = "Nombre de Alumno";

	var datos = new Array();
    var temp = new Array();

	xhr.open('POST',"resumenAlumnos.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

	xhr.onreadystatechange = function()
	{
        if(this.readyState == 4 && this.status == 200)
		{
			txt += this.responseText;
			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
            	temp[0] = myObj[i].idAlumno;
            	temp[1] = myObj[i].nombreAlum;
				temp[2] = myObj[i].apPAlum;
				temp[3] = myObj[i].apMAlum;
				datos[i] = new Array(temp[0],temp[1],temp[2],temp[3]);
			}
			var tr = document.createElement('TR');
            tableBody.appendChild(tr);
			for(var j = 0;j<heading.length;j++)
			{
                var th = document.createElement('TH');
                th.appendChild(document.createTextNode(heading[j]));
                tr.appendChild(th);
            }
			for (i = 0; i < datos.length; i++) 
			{
                var tr = document.createElement('TR');
				for (j = 0; j < datos[i].length; j++) 
				{
					if(j==0)
                    {var td = document.createElement('TD')
                    td.appendChild(document.createTextNode(datos[i][0]));
					tr.appendChild(td)}
					else
					{nom+=datos[i][j]+" "}
				}
				var td = document.createElement('TD')
                td.appendChild(document.createTextNode(nom));
				tr.appendChild(td)
				tableBody.appendChild(tr);
				nom="";
			}
			tableBody.appendChild(tr);
			divTab.appendChild(tabla);
			var head = document.getElementById("alumnos").createCaption();
			head.innerHTML = '<a class="tabTit">Alumnos Activos</a>';
		}
	};
}
//
function loadValues()
{
	var divValues = document.getElementById('inputValues');
	var br = document.createElement('br');
	if (document.getElementById('matricula').checked)
	{
		while(divValues.firstChild){
			divValues.removeChild(divValues.firstChild);
		}
		var matricula = document.createElement('input');
		matricula.setAttribute('type','text');
		matricula.setAttribute('id','matriculaAses');
		matricula.setAttribute('placeholder','Ej: 213356789011');
		matricula.setAttribute('maxlength',12);
		matricula.setAttribute('onkeyup','searchMatricula()');

		var nombre = document.createElement('label');
		nombre.setAttribute('id','nombreAsesor');

		var etiqueta = document.createElement('label');
		etiqueta.innerHTML="Matricula: ";

		divValues.appendChild(br);
		divValues.appendChild(etiqueta);
		divValues.appendChild(matricula);
		divValues.appendChild(nombre);
	}
	else if (document.getElementById('nombre').checked)
	{
		while(divValues.firstChild){
			divValues.removeChild(divValues.firstChild);
		}
		var nombreAses = document.createElement('select');
		nombreAses.setAttribute('id','selectAses');
		nombreAses.setAttribute('onchange','searchNombre()');

		var matricula = document.createElement('label');
		matricula.setAttribute('id','matriculaAses');

		divValues.appendChild(br);
		divValues.appendChild(matricula);
		divValues.appendChild(nombreAses);
		loadAsesores('selectAses');
	}
}
//
function loadSalones()
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var selectSalon = document.getElementById('selectSalon');
	var datos = new Array();
    var temp = new Array();
	var data = {};
	xhr.open('POST',"loadSalon.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

	xhr.onreadystatechange = function()
	{
        if(this.readyState == 4 && this.status == 200)
		{
			txt += this.responseText;
			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
            	temp[0] = myObj[i].idSalon;
				temp[1] = myObj[i].salon;
				temp[2] = myObj[i].edificioSalon;
				datos[i] = new Array(temp[0],temp[1],temp[2]);
			}
			var cad = "";
			for (j = 0; j < datos.length; j++)
			{
				cad = datos[j][1]+" Edificio "+datos[j][2];
				var opt = document.createElement('option');
				opt.innerHTML=cad;
				opt.value=datos[j][0];
				selectSalon.appendChild(opt);
            }
		}
	};
}
//
function loadAsesores(nombreSelect)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var selectAsesor = document.getElementById(nombreSelect);
	var datos = new Array();
    var temp = new Array();
	var data = {};
	xhr.open('POST',"loadAsesor.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

	xhr.onreadystatechange = function()
	{
        if(this.readyState == 4 && this.status == 200)
		{
			var opt = document.createElement('option');
				opt.innerHTML='Seleccione una opción...';
				opt.value='no';
				selectAsesor.appendChild(opt);
			txt += this.responseText;
			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
				temp[0] = myObj[i].matriculaAses;
            	temp[1] = myObj[i].nombreAses;
				temp[2] = myObj[i].apPAses;
				temp[3] = myObj[i].apMAses;
				datos[i] = new Array(temp[0],temp[1],temp[2],temp[3]);
			}
			var cad = "";
			for (j = 0; j < datos.length; j++)
			{
				cad = datos[j][1]+" "+datos[j][2]+" "+datos[j][3];
				var opt = document.createElement('option');
				opt.innerHTML=cad;
				opt.value=datos[j][0];
				selectAsesor.appendChild(opt);
            }
		}
	};
}
//
function loadMaterias(nombreSelect,plan)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var selectMateria = document.getElementById(nombreSelect);
	
	var datos = new Array();
    var temp = new Array();
	var data = {};
	data['planEstud']=plan;
	var json_string = JSON.stringify(data);
	xhr.open('POST',"loadMateria.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(json_string);

	xhr.onreadystatechange = function()
	{
        if(this.readyState == 4 && this.status == 200)
		{
			var opt = document.createElement('option');
				opt.innerHTML='Seleccione una opción...';
				opt.value='no';
				selectMateria.appendChild(opt);
			txt += this.responseText;
			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
				temp[0] = myObj[i].idMateria;
            	temp[1] = myObj[i].nombreMateria;
				datos[i] = new Array(temp[0],temp[1]);
			}
			for (j = 0; j < datos.length; j++)
			{
				var opt = document.createElement('option');
				opt.innerHTML=datos[j][1];
				opt.value=datos[j][0];
				selectMateria.appendChild(opt);
            }
		}
	};
}
//
function loadEstatusMateria()
{
	var selectEstatus = document.getElementById('select-estatus-materia');
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var data = {};
	data['identificador']=1;
	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOEstatus.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);

	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			myObj = JSON.parse(this.responseText);
			myObj.forEach(function(item){
				var option = document.createElement('option');
				option.innerText = item.estatusMateria;
				option.value = item.idEstatus;
				selectEstatus.appendChild(option);
			})
		}
	};
}
//

function loadValuesDetail(value)
{
	var aValues=document.getElementById('values-select-det');
	if(value=='asesoria')
	{
		if (document.getElementById('asesor-det').checked)
		{
			while(aValues.firstChild){
				aValues.removeChild(aValues.firstChild);
			}
			var nombreAses = document.createElement('select');
			nombreAses.setAttribute('id','select-ases-det');
			nombreAses.setAttribute('onchange','searchAsesoria(this.value)');

			aValues.appendChild(nombreAses);
			loadAsesores('select-ases-det');
		}
		else if(document.getElementById('materia-det').checked)
		{
			while(aValues.firstChild){
				aValues.removeChild(aValues.firstChild);
			}
			var planSelect=document.createElement('a');
			planSelect.setAttribute('id','select-plan-det');
			planSelect.setAttribute('class','select-plan-det');
			var planLabel = document.createElement('label');
			planLabel.innerText='Plan de Estudio: ';
			planSelect.appendChild(planLabel);
			var option1=document.createElement('input');
			option1.setAttribute('type','radio');
			option1.setAttribute('name','opt-plan');
			var option2=document.createElement('input');
			option2.setAttribute('type','radio');
			option2.setAttribute('name','opt-plan');
			var labelOP1=document.createElement('label');
			labelOP1.innerText='22';
			var labelOP2=document.createElement('label');
			labelOP2.innerText='33';

			option1.value="22";
			option2.value="33";
			planSelect.appendChild(labelOP1);
			planSelect.appendChild(option1);
			planSelect.appendChild(labelOP2);
			planSelect.appendChild(option2);
			
			option1.setAttribute('onchange','getMateriasPlan(this.value)');
			option2.setAttribute('onchange','getMateriasPlan(this.value)');

			aValues.appendChild(planSelect);
			var divSelectDet=document.createElement('a');
			divSelectDet.setAttribute('id','div-select-det');
			aValues.appendChild(divSelectDet);
		}
	}
	if(value=='alumno')
	{
		if(document.getElementById('id-alum-det').checked)
		{
			while(aValues.firstChild)
			{
				aValues.removeChild(aValues.firstChild);
			}
			var lablelIdAlumno = document.createElement('label');
			lablelIdAlumno.innerText='Id. Alumno: ';

			var idAlumno = document.createElement('input');
			idAlumno.setAttribute('type','text');
			idAlumno.setAttribute('id','idAlumno-det');
			idAlumno.setAttribute('maxlength',12);
			
			var buttonDet = document.createElement('button');
			buttonDet.setAttribute('onclick','searchIdAlumno(event,"idAlumno-det")');
			buttonDet.setAttribute('id','sendButton');
			buttonDet.innerText='Buscar'

			aValues.appendChild(lablelIdAlumno);
			aValues.appendChild(idAlumno);
			aValues.appendChild(buttonDet);
		}
		if(document.getElementById('nombre-alum-det').checked)
		{
			while(aValues.firstChild)
			{
				aValues.removeChild(aValues.firstChild);
			}
			var lablelNomAlum = document.createElement('label');
			lablelNomAlum.innerText='Nombre Alumno: ';

			var nombreAlumno = document.createElement('input');
			nombreAlumno.setAttribute('type','text');
			nombreAlumno.setAttribute('id','nombreAlumno-det');
			nombreAlumno.setAttribute('list','lista-alum-det');

			var listaAlumno = document.createElement('datalist');
			listaAlumno.setAttribute('id','lista-alum-det');
			listaAlumno.setAttribute('class','lista-alum-det');
			fillAlumnoList(listaAlumno);

			var buttonDet = document.createElement('button');
			buttonDet.setAttribute('onclick','searchIdAlumno(event,"nombreAlumno-det")');
			buttonDet.setAttribute('id','sendButton');
			buttonDet.innerText='Buscar'

			aValues.appendChild(lablelNomAlum);
			aValues.appendChild(nombreAlumno);
			aValues.appendChild(listaAlumno);
			aValues.appendChild(buttonDet);
		}
	}
	if(value=='asesor')
	{
		if(document.getElementById('id-ases-det').checked)
		{
			while(aValues.firstChild)
			{
				aValues.removeChild(aValues.firstChild);
			}
			var lablelIdAsesor = document.createElement('label');
			lablelIdAsesor.innerText='Id. Asesor: ';

			var idAsesor = document.createElement('input');
			idAsesor.setAttribute('type','text');
			idAsesor.setAttribute('id','idAses-det');
			idAsesor.setAttribute('maxlength',12);
			
			var buttonDet = document.createElement('button');
			buttonDet.setAttribute('onclick','searchIdAsesor(event,"idAses-det")');
			buttonDet.setAttribute('id','sendButton');
			buttonDet.innerText='Buscar'

			aValues.appendChild(lablelIdAsesor);
			aValues.appendChild(idAsesor);
			aValues.appendChild(buttonDet);
		}
		if(document.getElementById('nombre-ases-det').checked)
		{
			while(aValues.firstChild)
			{
				aValues.removeChild(aValues.firstChild);
			}
			var lablelNomAses = document.createElement('label');
			lablelNomAses.innerText='Nombre Asesor: ';

			var nombreAsesor = document.createElement('input');
			nombreAsesor.setAttribute('type','text');
			nombreAsesor.setAttribute('id','nombreAses-det');
			nombreAsesor.setAttribute('list','lista-ases-det');

			var listaAsesor = document.createElement('datalist');
			listaAsesor.setAttribute('id','lista-ases-det');
			listaAsesor.setAttribute('class','lista-ases-det');
			fillAsesorList(listaAsesor);

			var buttonDet = document.createElement('button');
			buttonDet.setAttribute('onclick','searchIdAsesor(event,"nombreAses-det")');
			buttonDet.setAttribute('id','sendButton');
			buttonDet.innerText='Buscar'

			aValues.appendChild(lablelNomAses);
			aValues.appendChild(nombreAsesor);
			aValues.appendChild(listaAsesor);
			aValues.appendChild(buttonDet);
		}
	}
}
//
function loadDetailList(value)
{
	var xhr = new XMLHttpRequest();
	txt="";
	var temp = new Array();
	var datos = new Array();
	var data = {};
	
	var divDetalleLista = document.getElementById('detalle-lista');
	var heading = new Array();
	heading[0] = "No. Lista";
	heading[1] = "Id. Alumno";
	heading[2] = "Nombre";
	heading[3] = "A. Paterno";
	heading[4] = "A. Materno";
	/*==========================Detalle de listas==========================*/
	data['identificador']=2;
	data['searchValue']=value;
	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOListaAsesoria.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);
	while(divDetalleLista.firstChild)
	{
		divDetalleLista.removeChild(divDetalleLista.firstChild);
	}
	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			txt += this.responseText;
			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
				for(var j = 0;j<myObj[i].length;j++)
				{
					temp[0] = myObj[i][j].idAlumno;
					temp[1] = myObj[i][j].nombreAlum;
					temp[2] = myObj[i][j].apPAlum;
					temp[3] = myObj[i][j].apMAlum;
					datos[i] = new Array(temp[0],temp[1],temp[2],temp[3]);
				}
			}
			var tabla = document.createElement('TABLE');
			tabla.setAttribute('class','listaDetTable');
			tabla.setAttribute('id','listaDetTable');
			var tableBody = document.createElement('TBODY');
			tabla.appendChild(tableBody);

			var tr = document.createElement('TR');
			tableBody.appendChild(tr);
			for(var j = 0;j<heading.length;j++)
			{
				var th = document.createElement('TH');
				th.appendChild(document.createTextNode(heading[j]));
				tr.appendChild(th);
			}
			//FILAS DE LA TABLA
			for (i = 0; i < datos.length; i++) 
			{
				var tr = document.createElement('TR');
				for (j = 0; j < datos[i].length; j++) 
				{
					if(j==0)
					{var td = document.createElement('TD')
					td.appendChild(document.createTextNode(i+1));
					tr.appendChild(td)
					var td = document.createElement('TD')
					td.appendChild(document.createTextNode(datos[i][j]));
					tr.appendChild(td)}
					else{
					var td = document.createElement('TD')
					td.appendChild(document.createTextNode(datos[i][j]));
					tr.appendChild(td)}
				}
				tableBody.appendChild(tr);
			}
			divDetalleLista.appendChild(tabla);
		}
	};
}


function searchAsesoria(valueDet)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var divTab = document.getElementById('info-ases-det');
	
	var datos = new Array();
    var temp = new Array();

	var data = {};
	data['identificador']=3;
	data['searchValue']=valueDet;
	if(valueDet!='no')
	{
		if(valueDet.length<=4){data['typeSearch']='idMateria';}
		else if(valueDet.length>4){data['typeSearch']='idAsesor'};
		var json_string = JSON.stringify(data);
		xhr.open('POST',"VOAsesoria.php",true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);
		while(divTab.firstChild){
			divTab.removeChild(divTab.firstChild);
		}
		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				myObj = JSON.parse(this.responseText);
				for(var i = 0;i<myObj.length;i++)
				{
					temp[0] = myObj[i].idAsesoria;
					temp[1] = myObj[i].nombreMateria;
					temp[2] = myObj[i].nombreAses;
					temp[3] = myObj[i].salon;
					temp[4] = myObj[i].edificioSalon;
					temp[5] = myObj[i].horarioAsesoria;
					datos[i] = new Array(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]);
				}
				for (i = 0; i < datos.length; i++) 
				{
					var formaDetail = createAsesDetail(datos[i]);
					divTab.appendChild(formaDetail);
				}
			}
		};
	}
	else
	{
		while(divTab.firstChild){
			divTab.removeChild(divTab.firstChild);
		}
	}
}

function createAsesDetail(asesoria)
{
	var heading = new Array();
    heading[0] = "Id. Asesoría";
    heading[1] = "Materia";
	heading[2] = "Asesor";
	heading[3] = "Salón";
	heading[4] = "Edificio";
	heading[5] = "Horario";

	var naming = new Array();
    naming[0] = "idAsesoria";
    naming[1] = "nombreMateria";
	naming[2] = "nombreAsesor";
	naming[3] = "salon";
	naming[4] = "edificio";
	naming[5] = "horario";
	var i=0;
	var salto=document.createElement("BR");
	var formaDetail = document.createElement('form');
	formaDetail.setAttribute('class','div-ases-detail');
	formaDetail.setAttribute('id','div-ases-detail');
	asesoria.forEach(function(item)
	{
		var labelName = document.createElement('label');
		var textBox = document.createElement('input');
		textBox.setAttribute('type','text');
		textBox.setAttribute('class',naming[i]);
		textBox.setAttribute('readonly','');
		labelName.appendChild(document.createTextNode(heading[i]));
		textBox.value=item;
		if(naming[i]=='salon')
		{formaDetail.appendChild(salto);}
		formaDetail.appendChild(labelName);
		formaDetail.appendChild(textBox);
		i++;
	});
	return	formaDetail;
}



function loadPDFGenerator(value)
{
	var reportDet = document.getElementById('div-text-report');
	if(value=='alumno')
	{
		while(reportDet.firstChild)
		{
			reportDet.removeChild(reportDet.firstChild);
		}
		var labelAlumno = document.createElement('label');
		labelAlumno.setAttribute('id','label-alumno');
		labelAlumno.setAttribute('value','Alumno: ');
		reportDet.appendChild(labelAlumno);
		var nombreAlumno = document.createElement('input');
		nombreAlumno.setAttribute('type','text');
		nombreAlumno.setAttribute('id','alumno-pdf-search')
		nombreAlumno.setAttribute('list','lista-alum-det');
		reportDet.appendChild(nombreAlumno);
		var listaAlum = document.createElement('datalist');
		listaAlum.setAttribute('id','lista-alum-det');
		fillAlumnoList(listaAlum);
		reportDet.appendChild(listaAlum);
	}
	else if(value=='asesor')
	{
		while(reportDet.firstChild)
		{
			reportDet.removeChild(reportDet.firstChild);
		}
		var labelAsesor = document.createElement('label');
		labelAsesor.setAttribute('id','label-asesor');
		labelAsesor.setAttribute('value','Asesor: ');
		reportDet.appendChild(labelAsesor);
		var nombreAsesor = document.createElement('input');
		nombreAsesor.setAttribute('type','text');
		nombreAsesor.setAttribute('id','asesor-pdf-search')
		nombreAsesor.setAttribute('list','lista-ases-det');
		reportDet.appendChild(nombreAsesor);
		var listaAsesor = document.createElement('datalist');
		listaAsesor.setAttribute('id','lista-ases-det');
		fillAsesorList(listaAsesor);
		reportDet.appendChild(listaAsesor);
	}
	else if(value=='lista')
	{
		while(reportDet.firstChild)
		{
			reportDet.removeChild(reportDet.firstChild);
		}
		var labelAsesoria = document.createElement('label');
		labelAsesoria.setAttribute('id','label-asesoria');
		labelAsesoria.setAttribute('value','Asesoría: ');
		reportDet.appendChild(labelAsesoria);
		var idAsesoria = document.createElement('select');
		idAsesoria.setAttribute('id','select-asesoria');
		reportDet.appendChild(idAsesoria);
		loadAsesorias('listas');
	}
}




function searchMatricula()
{
	var input = document.getElementById('matriculaAses');
	input.addEventListener("keyup", function(event) 
	{
		if (event.keyCode === 13) 
		{
			event.preventDefault();
			var xhr = new XMLHttpRequest();
			var txt = "";
			var nombre = "";
			var myObj;
			var n = document.getElementById('nombreAsesor');
			var matricula = input.value;
			var datos = new Array();
			var temp = new Array();
			var data = {};
			data['matriculaAses']=matricula;
			data['identificador']=1;
			var json_string = JSON.stringify(data);
			xhr.open('POST',"VOAsesor.php",true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(json_string);
			xhr.onreadystatechange = function()
			{
				if(this.readyState == 4 && this.status == 200)
				{
					txt += this.responseText;
					if(txt!="")
					{
						myObj = JSON.parse(this.responseText);
						for(var i = 0;i<myObj.length;i++)
						{
							temp[0] = myObj[i].nombreAses;
							temp[1] = myObj[i].apPAses;
							temp[2] = myObj[i].apMAses;
							datos[i] = new Array(temp[0],temp[1],temp[2]);
						}
						nombre = datos[0][0]+" "+datos[0][1]+" "+datos[0][2];
						n.innerHTML=nombre;
					}
				}
			};	
		}
	});
}

function invoquePDFFrame(responseParsed,typeSearch)
{
	var txt = "";
	var myObj;
	var data={};
	var divPDFreport = document.getElementById('divPDFreport');
	var framePDFReport = document.createElement('iframe');
	framePDFReport.setAttribute('id','framePDFReport');
	if(responseParsed.length>1)
	{
		data['idAsesoria']=responseParsed;
	}
	else
	{
		for(var i = 0;i<responseParsed.length;i++)
		{
			data=responseParsed[i];
		}
	}
	var json_string = JSON.stringify(data);
	while(divPDFreport.firstChild)
	{
		divPDFreport.removeChild(divPDFreport.firstChild);
	}
	var xhr = new XMLHttpRequest();
	if(typeSearch=='alumno')
	{
		var objective = 'generatePDFAlumno.php';
	}
	else if(typeSearch=='asesor')
	{
		var objective = 'generatePDFAsesor.php';
	}
	else if(typeSearch=='lista')
	{
		var objective = 'generatePDFLista.php';
	}
	xhr.open('POST',objective,true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);
	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			txt+=this.response;

			framePDFReport.setAttribute("src",txt);
			framePDFReport.setAttribute("width","100%");
			framePDFReport.setAttribute("height","600px");
			divPDFreport.appendChild(framePDFReport);
		}
	};
}

function generateReportPDF(event)
{
	event.preventDefault();
	var dataSend = document.getElementById('div-text-report').querySelectorAll("input");
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	if(dataSend.length>0)
	{
		var input_box = dataSend[0];
		var input_type = dataSend[0].id;

		if(input_type=='alumno-pdf-search')
		{
			var data = {};
			data['identificador']=2;
			data['idAlumno']=input_box.value;
			var json_string = JSON.stringify(data);
			xhr.open('POST',"VOAlumno.php",true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(json_string);
			xhr.onreadystatechange = function()
			{
				if(this.readyState == 4 && this.status == 200)
				{
					txt += this.responseText;
					myObj = JSON.parse(this.responseText);
					invoquePDFFrame(myObj,'alumno');
				}
			}
		}
		else if(input_type=='asesor-pdf-search')
		{
			var data = {};
			data['identificador']=2;
			data['matriculaAses']=input_box.value;
			var json_string = JSON.stringify(data);
			xhr.open('POST',"VOAsesor.php",true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(json_string);
			xhr.onreadystatechange = function()
			{
				if(this.readyState == 4 && this.status == 200)
				{
					txt += this.responseText;
					myObj = JSON.parse(this.responseText);
					invoquePDFFrame(myObj,'asesor');
				}
			}
		}
	}
	else
	{
		var dataSend = document.getElementById('select-asesoria').value;
		invoquePDFFrame(dataSend,'lista');
	}
}

function searchIdAsesor(event,input_name_box)
{
	event.preventDefault();
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var divTab = document.getElementById('info-alum-det');
	var input_box = document.getElementById(input_name_box);
	while(divTab.firstChild)
	{
		divTab.removeChild(divTab.firstChild);
	}
	var heading = new Array();
	heading[0] = "Matricula";
	heading[1] = "Nombre";
	heading[2] = "A. Paterno";
	heading[3] = "A. Materno";
	heading[4] = "Carrera";
	heading[5] = "División";
	heading[6] = "Telefono";
	heading[7] = "E-mail";
	heading[8] = "Fecha Inicio";
	heading[9] = "Fecha Fin";
	heading[10] = "Estatus";

	var naming = new Array();
	naming[0] = "matriculaAses";
	naming[1] = "nombreAses";
	naming[2] = "apPAses";
	naming[3] = "apMAses";
	naming[4] = "nombreCarrera";
	naming[5] = "division";
	naming[6] = "telAses";
	naming[7] = "mailAses";
	naming[8] = "fechaInicio";
	naming[9] = "fechaFin";
	naming[10] = "estServ";

	var datos = new Array();
	var temp = new Array();

	var data = {};
	data['identificador']=2;
	data['matriculaAses']=input_box.value;
	var salto=document.createElement("BR");
	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOAsesor.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);
	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			txt += this.responseText;
			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
				temp[0] = myObj[i].matriculaAses;
				temp[1] = myObj[i].nombreAses;
				temp[2] = myObj[i].apPAses;
				temp[3] = myObj[i].apMAses;
				temp[4] = myObj[i].carrera;
				temp[5] = myObj[i].division;
				temp[6] = myObj[i].telAses;
				temp[7] = myObj[i].mailAses;
				temp[8] = myObj[i].fechaInicio;
				temp[9] = myObj[i].fechaFin;
				temp[10] = myObj[i].estServ;
				
				datos[i] = new Array(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7],temp[8],temp[9],temp[10]);
			}
			var formaDetail = document.createElement('form');
			formaDetail.setAttribute('class','form-ases-det');
			formaDetail.setAttribute('id','form-ases-det');
			for (j = 0; j < datos[0].length; j++) 
			{
				var labelName = document.createElement('label');
				var textBox = document.createElement('input');
				textBox.setAttribute('type','text');
				textBox.setAttribute('class',naming[j]);
				textBox.setAttribute('id',naming[j]);
				textBox.setAttribute('readonly','');
				labelName.appendChild(document.createTextNode(heading[j]));
				textBox.value=datos[0][j];
				formaDetail.appendChild(labelName);
				formaDetail.appendChild(textBox);
			}
			divTab.appendChild(formaDetail);

			var buttonEdit = document.createElement("button");
			buttonEdit.setAttribute('id','editButton');
			buttonEdit.setAttribute('class','editButton');
			buttonEdit.setAttribute('onClick','editValuesAsesor();');
			buttonEdit.appendChild(document.createTextNode("Editar"));
			formaDetail.parentNode.insertBefore(buttonEdit,formaDetail.nextSibling);
			
			var divListaAsesorias = document.createElement('div');
			divListaAsesorias.setAttribute('id','divListaAsesorias');
			divListaAsesorias.setAttribute('class','divListaAsesorias');
			getListaAsesorias(divListaAsesorias,input_box);
		}
	};
}

function searchIdAlumno(event,input_name_box)
{
	event.preventDefault();
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var divTab = document.getElementById('info-alum-det');
	var input_box = document.getElementById(input_name_box);

	while(divTab.firstChild)
	{
		divTab.removeChild(divTab.firstChild);
	}
	var heading = new Array();
	heading[0] = "Id. Alumno";
	heading[1] = "Nombre";
	heading[2] = "A. Paterno";
	heading[3] = "A. Materno";
	heading[4] = "CURP";
	heading[5] = "Telefono";
	heading[6] = "E-mail";
	heading[7] = "Dirección";
	heading[8] = "Fecha Inicio";
	heading[9] = "Fecha Fin";
	heading[10] = "Estatus";
	heading[11] = "Plan de Estudios";

	var naming = new Array();
	naming[0] = "idAlumno";
	naming[1] = "nombreAlumno";
	naming[2] = "appAlumno";
	naming[3] = "apmAlumno";
	naming[4] = "curpAlumno";
	naming[5] = "telAlumno";
	naming[6] = "mailAlumno";
	naming[7] = "dirAlumno";
	naming[8] = "fechaInicio";
	naming[9] = "fechaFin";
	naming[10] = "estatusAlum";
	naming[11] = "planDeEstud";

	var datos = new Array();
	var temp = new Array();

	var data = {};
	data['identificador']=2;
	data['idAlumno']=input_box.value;
	var salto=document.createElement("BR");
	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOAlumno.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);
	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			txt += this.responseText;
			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
				temp[0] = myObj[i].idAlumno;
				temp[1] = myObj[i].nombreAlum;
				temp[2] = myObj[i].apPAlum;
				temp[3] = myObj[i].apMAlum;
				temp[4] = myObj[i].curpAlum;
				temp[5] = myObj[i].telAlum;
				temp[6] = myObj[i].mailAlum;
				temp[7] = myObj[i].direccionAlum;
				temp[8] = myObj[i].fechaInicio;
				temp[9] = myObj[i].fechaFin;
				temp[10] = myObj[i].estAlum;
				temp[11] = myObj[i].planEstud;
				datos[i] = new Array(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7],temp[8],temp[9],temp[10],temp[11]);
			}
			var formaDetail = document.createElement('form');
			formaDetail.setAttribute('class','form-alum-det');
			formaDetail.setAttribute('id','form-alum-det');
			for (j = 0; j < datos[0].length; j++) 
			{
				var labelName = document.createElement('label');
				var textBox = document.createElement('input');
				textBox.setAttribute('type','text');
				textBox.setAttribute('class',naming[j]);
				textBox.setAttribute('id',naming[j]);
				textBox.setAttribute('readonly','');
				labelName.appendChild(document.createTextNode(heading[j]));
				textBox.value=datos[0][j];
				formaDetail.appendChild(labelName);
				formaDetail.appendChild(textBox);
			}
			divTab.appendChild(formaDetail);

			var buttonEdit = document.createElement("button");
			buttonEdit.setAttribute('id','editButton');
			buttonEdit.setAttribute('class','editButton');
			buttonEdit.setAttribute('onClick','editValuesAlumno();');
			buttonEdit.appendChild(document.createTextNode("Editar"));
			formaDetail.parentNode.insertBefore(buttonEdit,formaDetail.nextSibling);
			
			var divListaMaterias = document.createElement('div');
			divListaMaterias.setAttribute('id','divListaMaterias');
			divListaMaterias.setAttribute('class','divListaMaterias');
			getListaMaterias(divListaMaterias,input_box);
		}
	};
}

function getListaMaterias(divListaMaterias,input_box)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var divForma = document.getElementById('div-materias');
	while(divForma.firstChild)
	{
		divForma.removeChild(divForma.firstChild);
	}
	var heading = new Array();
	heading[0] = "Id";
	heading[1] = "Clave";
	heading[2] = "Materia";
	heading[3] = "Calificación";
	heading[4] = "Estatus";
	heading[5] = "Fecha de examen";

	var datos = new Array();
	var temp = new Array();

	var data = {};
	data['identificador']=1;
	data['idAlumno']=input_box.value;

	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOEstatusMateria.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);
	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			txt += this.responseText;
			var divTituloMaterias = document.createElement('div');
			divTituloMaterias.setAttribute('class','tittle-materias');
			var aTituloMaterias = document.createElement('a');
			aTituloMaterias.setAttribute('id','hide-form-det-materias');
			aTituloMaterias.setAttribute('href','#');
			aTituloMaterias.innerText='Detalle Materias';
			divTituloMaterias.appendChild(aTituloMaterias);
			divForma.appendChild(divTituloMaterias);
			divTituloMaterias.parentNode.insertBefore(divListaMaterias,divTituloMaterias.nextSibling);

			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
				temp[0] = myObj[i].idAlumno;
				temp[1] = myObj[i].idMateria;
				temp[2] = myObj[i].nombreMateria;
				temp[3] = myObj[i].calificacion;
				temp[4] = myObj[i].estatus;
				temp[5] = myObj[i].fechaExamen;

				datos[i] = new Array(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]);
			}
			var tabla = document.createElement('TABLE');
			tabla.setAttribute('class','materias-table');
			tabla.setAttribute('id','materias-table');
			var tableBody = document.createElement('TBODY');
			tableBody.setAttribute('id','materias-dat');
			tabla.appendChild(tableBody);

			var tr = document.createElement('TR');
				tableBody.appendChild(tr);
				for(var j = 0;j<heading.length;j++)
				{
					var th = document.createElement('TH');
					th.appendChild(document.createTextNode(heading[j]));
					th.setAttribute('id','columna'+j);
					tr.appendChild(th);
				}
				//FILAS DE LA TABLA
				for (i = 0; i < datos.length; i++) 
				{
					var tr = document.createElement('TR');
					for (j = 0; j < datos[i].length; j++) 
					{
						var td = document.createElement('TD')
						td.appendChild(document.createTextNode(datos[i][j]));
						tr.appendChild(td);
					}
					tableBody.appendChild(tr);

				}
				tableBody.appendChild(tr);
				divListaMaterias.appendChild(tabla);
				hideDiv('materias');

				var hiddenButton = document.getElementById('add-materia-button');
				hiddenButton.removeAttribute('hidden');
		}
	};

}

function getListaAsesorias(divListaAsesorias,input_box)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var totalHoras, horas=0, minutos=0;
	var divForma = document.getElementById('div-asesorias');
	while(divForma.firstChild)
	{
		divForma.removeChild(divForma.firstChild);
	}
	var heading = new Array();
	heading[0] = "Id";
	heading[1] = "Periodo";
	heading[2] = "Fecha de Inicio";
	heading[3] = "Fecha de Fin";
	heading[4] = "Materia";
	heading[5] = "Horas";

	var datos = new Array();
	var temp = new Array();

	var data = {};
	data['identificador']=4;
	data['idAsesor']=input_box.value;

	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOAsesoria.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);
	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			txt += this.responseText;
			var divTituloAsesorias = document.createElement('div');
			divTituloAsesorias.setAttribute('class','tittle-materias');
			var aTituloAsesorias = document.createElement('a');
			aTituloAsesorias.setAttribute('id','hide-form-det-listas');
			aTituloAsesorias.setAttribute('href','#');
			aTituloAsesorias.innerText='Detalle Asesorias';
			divTituloAsesorias.appendChild(aTituloAsesorias);
			divForma.appendChild(divTituloAsesorias);
			divTituloAsesorias.parentNode.insertBefore(divListaAsesorias,divTituloAsesorias.nextSibling);

			myObj = JSON.parse(this.responseText);
			for(var i = 0;i<myObj.length;i++)
			{
				temp[0] = myObj[i].idAsesoria;
				temp[1] = myObj[i].idPeriodo;
				temp[2] = myObj[i].fechaInicio;
				temp[3] = myObj[i].fechaFin;
				temp[4] = myObj[i].nombreMateria;
				temp[5] = myObj[i].horasAsesoria;

				datos[i] = new Array(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]);
			}
			var tabla = document.createElement('TABLE');
			tabla.setAttribute('class','materias-table');
			tabla.setAttribute('id','asesorias-table');
			var tableBody = document.createElement('TBODY');
			tableBody.setAttribute('id','materias-dat');
			tabla.appendChild(tableBody);

			var tr = document.createElement('TR');
				tableBody.appendChild(tr);
				for(var j = 0;j<heading.length;j++)
				{
					var th = document.createElement('TH');
					th.appendChild(document.createTextNode(heading[j]));
					th.setAttribute('id','columna'+j);
					tr.appendChild(th);
				}
				//FILAS DE LA TABLA
				for (i = 0; i < datos.length; i++) 
				{
					var tr = document.createElement('TR');
					for (j = 0; j < datos[i].length; j++) 
					{
						var td = document.createElement('TD');
						td.appendChild(document.createTextNode(datos[i][j]));
						if(j==5)
						{
							var cast_horas=datos[i][j].split(":");
							horas = horas+(1*cast_horas[0]);
							minutos=minutos+(1*cast_horas[1]);
						}
							tr.appendChild(td);
					}
					tableBody.appendChild(tr);
				}
				minutos=minutos/60;
				var cast_min=minutos.toString().split(".");
				horas=horas+(1*cast_min[0]);
				if(cast_min.length>1)
					minutos=(1*cast_min[1])*60;
				else
					minutos='00';
				totalHoras=horas+":"+minutos+":"+"00";
				var tr = document.createElement('TR');
				for(i=0;i<datos[0].length;i++)
				{
					var th = document.createElement('th');
					if(i==4)
					{
						th.appendChild(document.createTextNode('TOTAL:'));
						tr.appendChild(th);
					}
					else if(i==5)
					{
						th.appendChild(document.createTextNode(totalHoras));
						tr.appendChild(th);
					}
					else
						tr.appendChild(th);
				}
				tableBody.appendChild(tr);
				divListaAsesorias.appendChild(tabla);
				hideDiv('listas');
		}
	};
}

function editValuesAsesor()
{
	var divData = document.getElementById('form-ases-det');
	var fechaInicio = document.getElementById('fechaInicio');
	var fechaFin = document.getElementById('fechaFin');
	var estServ = document.getElementById('estServ');
	var nombreCarrera = document.getElementById('nombreCarrera');
	var matriculaAses = document.getElementById('matriculaAses').value;
	divData.setAttribute('class','form-ases-det-edit');
	for(var i = 0;i<divData.length;i++)
	{
		divData.elements[i].removeAttribute("readonly");
	}
	document.getElementById('nombreCarrera').addEventListener("keyup", function(event){searchCarreras(event)});
	document.getElementById('division').setAttribute('readonly',"");

	var buttonEdit = document.getElementById('editButton');
	buttonEdit.remove();
	
	var saveButton = document.createElement("button");
	saveButton.setAttribute('id','saveButton');
	saveButton.setAttribute('class','saveButton');
	saveButton.setAttribute('onClick','sendValues("asesorEdit-'+matriculaAses+'");');
	saveButton.appendChild(document.createTextNode("Guardar"));
	divData.parentNode.insertBefore(saveButton,divData.nextSibling);

	var cancelButton = document.createElement("button");
	cancelButton.setAttribute('id','cancelButton');
	cancelButton.setAttribute('class','cancelButton');
	cancelButton.setAttribute('onClick','cancelEditedValuesAsesor();');
	cancelButton.appendChild(document.createTextNode("Cancelar"));
	divData.parentNode.insertBefore(cancelButton,divData.nextSibling);

	fechaInicio.setAttribute('type','date');
	fechaFin.setAttribute('type','date');

	var selectEstatus = document.createElement('select');
	selectEstatus.setAttribute('id','selectEstatus');
	llenaEstatusServicio(selectEstatus,estServ.value);
	estServ.parentNode.replaceChild(selectEstatus, estServ);
}

function cancelEditedValuesAsesor()
{
	event.preventDefault();
	var divData = document.getElementById('form-ases-det');
	var estatus = document.getElementById('selectEstatus');
	divData.setAttribute('class','form-ases-det');
	var saveButton = document.getElementById('saveButton');
	var cancelButton = document.getElementById('cancelButton');

	var estatusText = document.createElement('input');
	estatusText.value=estatus.options[estatus.selectedIndex].text;
	estatusText.setAttribute('id','estatusAses');
	estatusText.setAttribute('class','estatusAses');

	estatus.parentNode.replaceChild(estatusText,estatus);

	for(var i = 0;i<divData.length;i++)
	{
		divData.elements[i].setAttribute("type","text");
		divData.elements[i].setAttribute("readonly","");
	}
	saveButton.remove();
	cancelButton.remove();

	var buttonEdit = document.createElement("button");
	buttonEdit.setAttribute('id','editButton');
	buttonEdit.setAttribute('class','editButton');
	buttonEdit.setAttribute('onClick','editValuesAsesor();');
	buttonEdit.appendChild(document.createTextNode("Editar"));
	divData.parentNode.insertBefore(buttonEdit,divData.nextSibling);
}


function editValuesAlumno()
{
	var divData = document.getElementById('form-alum-det');
	var fechaInicio = document.getElementById('fechaInicio');
	var fechaFin = document.getElementById('fechaFin');
	var estatus = document.getElementById('estatusAlum');
	var planEstud = document.getElementById('planDeEstud');
	var idAlumno = document.getElementById('idAlumno').value;
	var curpAlumno = document.getElementById('curpAlumno').value;
	divData.setAttribute('class','form-alum-det-edit');
	for(var i = 0;i<divData.length;i++)
	{
		divData.elements[i].removeAttribute("readonly");
	}
	var buttonEdit = document.getElementById('editButton');
	buttonEdit.remove();
	
	var saveButton = document.createElement("button");
	saveButton.setAttribute('id','saveButton');
	saveButton.setAttribute('class','saveButton');
	saveButton.setAttribute('onClick','sendValues("alumnoEdit-'+idAlumno+'-'+curpAlumno+'");');
	saveButton.appendChild(document.createTextNode("Guardar"));
	divData.parentNode.insertBefore(saveButton,divData.nextSibling);

	var cancelButton = document.createElement("button");
	cancelButton.setAttribute('id','cancelButton');
	cancelButton.setAttribute('class','cancelButton');
	cancelButton.setAttribute('onClick','cancelEditedValuesAlumno();');
	cancelButton.appendChild(document.createTextNode("Cancelar"));
	divData.parentNode.insertBefore(cancelButton,divData.nextSibling);

	fechaInicio.setAttribute('type','date');
	fechaFin.setAttribute('type','date');

	var selectEstatus = document.createElement('select');
	selectEstatus.setAttribute('id','selectEstatus');
	llenaEstatusAlumno(selectEstatus,estatus.value);
	estatus.parentNode.replaceChild(selectEstatus, estatus);

	var selectPlanes = document.createElement('select');
	selectPlanes.setAttribute('id','selectPlanes');
	llenaPlanEstudios(selectPlanes,planEstud.value);
	planEstud.parentNode.replaceChild(selectPlanes, planEstud);
}

function cancelEditedValuesAlumno()
{
	event.preventDefault();
	var divData = document.getElementById('form-alum-det');
	var estatus = document.getElementById('selectEstatus');
	var planEstud = document.getElementById('selectPlanes');
	divData.setAttribute('class','form-alum-det');
	var saveButton = document.getElementById('saveButton');
	var cancelButton = document.getElementById('cancelButton');

	var estatusText = document.createElement('input');
	var planEstudText = document.createElement('input');
	estatusText.value=estatus.options[estatus.selectedIndex].text;
	planEstudText.value=planEstud.options[planEstud.selectedIndex].text;
	estatusText.setAttribute('id','estatusAlum');
	planEstudText.setAttribute('id','planDeEstud');
	estatusText.setAttribute('class','estatusAlum');
	planEstudText.setAttribute('class','planDeEstud');

	estatus.parentNode.replaceChild(estatusText,estatus);
	planEstud.parentNode.replaceChild(planEstudText,planEstud);

	for(var i = 0;i<divData.length;i++)
	{
		divData.elements[i].setAttribute("type","text");
		divData.elements[i].setAttribute("readonly","");
	}
	saveButton.remove();
	cancelButton.remove();

	var buttonEdit = document.createElement("button");
	buttonEdit.setAttribute('id','editButton');
	buttonEdit.setAttribute('class','editButton');
	buttonEdit.setAttribute('onClick','editValuesAlumno();');
	buttonEdit.appendChild(document.createTextNode("Editar"));
	divData.parentNode.insertBefore(buttonEdit,divData.nextSibling);
}

function llenaEstatusAlumno(selectEstatus,estatus)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var data = {};
	data['identificador']=1;
	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOEstatusAlumno.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);

	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			myObj = JSON.parse(this.responseText);
			var i=0;
			myObj.forEach(function(item){
				var option = document.createElement('option');
				option.innerText = item.estAlum;
				option.value = item.idEstatusAlum;
				selectEstatus.appendChild(option);
				if(item.estAlum==estatus)
				{
					selectEstatus.selectedIndex = i;
				}
				i++;
			})
		}
	};
}

function llenaEstatusServicio(selectEstatus,estatus)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var data = {};
	data['identificador']=1;
	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOEstatusServicio.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);

	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			myObj = JSON.parse(this.responseText);
			var i=0;
			myObj.forEach(function(item){
				var option = document.createElement('option');
				option.innerText = item.estServ;
				option.value = item.idEstatusServ;
				selectEstatus.appendChild(option);
				if(item.estServ==estatus)
				{
					selectEstatus.selectedIndex = i;
				}
				i++;
			})
		}
	};
}

function llenaPlanEstudios(selectPlanes,planEstud)
{
	var xhr = new XMLHttpRequest();
	var txt = "";
	var myObj;
	var data = {};
	data['identificador']=1;
	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOPlanDeEstudio.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);

	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			myObj = JSON.parse(this.responseText);
			var i=0;
			myObj.forEach(function(item){
				var option = document.createElement('option');
				option.innerText = item.planEstud;
				option.value = item.idPlanEstud;
				selectPlanes.appendChild(option);
				if(item.planEstud==planEstud)
				{
					selectPlanes.selectedIndex = i;
				}
				i++;
			})
		}
	};
}

function fillAsesorList(list)
{
	var xhr = new XMLHttpRequest();
	var myObj;
	var data = {};
	data['identificador']=3;
	var json_string = JSON.stringify(data);
	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			myObj = JSON.parse(this.responseText);
			list.innerHTML="";
			myObj.forEach(function(item){
				var txt=item.nombreAses+" "+item.apPAses+" "+item.apMAses;
				var option = document.createElement('option');
				option.innerText = txt;
				option.value=item.matriculaAses;
				list.appendChild(option);
			})
		}
	};
	xhr.open('POST',"VOAsesor.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);
}

function fillAlumnoList(list)
{
	var xhr = new XMLHttpRequest();
	var myObj;
	var data = {};
	data['identificador']=4;
	var json_string = JSON.stringify(data);
	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			myObj = JSON.parse(this.responseText);
			list.innerHTML="";
			myObj.forEach(function(item){
				var txt=item.nombreAlum+" "+item.apPAlum+" "+item.apMAlum;
				var option = document.createElement('option');
				option.innerText = txt;
				option.value=item.idAlumno;
				list.appendChild(option);
			})
		}
	};
	xhr.open('POST',"VOAlumno.php",true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(json_string);
}

function searchCarreras(event)
{
	if (event.keyCode >= 37 && event.keyCode<=40 || event.keyCode==9 || event.keyCode==27 || event.keyCode==13)
	{return;}
	else
	{
		var input = event.target;
		var listaCarrera = document.getElementById('lista-carreras');
		var min_ = 0;
		var xhr = new XMLHttpRequest();
		var myObj;
		var carrera = input.value;
		var data = {};
		data['nombreCarrera']=carrera;
		data['identificador']=1;
		var json_string = JSON.stringify(data);
		if (input.value.length < min_ ) 
		{ 
			return;
		} 
		else 
		{
			xhr.onreadystatechange = function()
			{
				if(this.readyState == 4 && this.status == 200)
				{
					myObj = JSON.parse(this.responseText);
					listaCarrera.innerHTML="";
					myObj.forEach(function(item){
						var option = document.createElement('option');
						option.value = item.nombreCarrera;
						listaCarrera.appendChild(option);
					})
				}
			};
		}
		xhr.open('POST',"VOCarrera.php",true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);
	}
}

function searchMateria(event)
{
	if (event.keyCode >= 37 && event.keyCode<=40 || event.keyCode==9 || event.keyCode==27 || event.keyCode==13)
	{return;}
	else
	{
		var input = event.target;
		var listaMat = document.getElementById('materia-list');
		var min_ = 0;
		var xhr = new XMLHttpRequest();
		var myObj;
		var materia = input.value;
		var data = {};
		data['nombreMateria']=materia;
		var json_string = JSON.stringify(data);
		if (input.value.length < min_ ) 
		{ 
			return;
		} 
		else 
		{
			xhr.onreadystatechange = function()
			{
				if(this.readyState == 4 && this.status == 200)
				{
					myObj = JSON.parse(this.responseText);
					listaMat.innerHTML="";
					myObj.forEach(function(item){
						var option = document.createElement('option');
						option.value = item.nombreMateria;
						listaMat.appendChild(option);
					})
				}
			};
		}
		xhr.open('POST',"getMateria.php",true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);
	}
}

function searchNombre()
{
	var matricula = document.getElementById('matriculaAses');
	var nombre = document.getElementById('selectAses');
	matricula.value=nombre.value;
	if(nombre.value!='no')
		matricula.innerHTML=nombre.value+" ";
	else
		matricula.innerHTML="";
}

function sendValues(option)
{
	var xhr = new XMLHttpRequest();
	txt="";
	var datos = {};
	if(option=='addAsesoria')
	{
		var count=0;
		var idAsesoria = document.getElementById('idAsesoria').value;
		var horas = document.getElementById('horas').value;
		var minutos = document.getElementById('minutos').value;
		var nombreMateria = document.getElementById('nombreMateria').value;
		var salon = document.getElementById('selectSalon').value;
		var periodo = document.getElementById('periodoAses').value;
		var asesor = document.getElementById('matriculaAses').value;
		var horario = document.getElementById('horarioAsesoria').value;
		
		var dias = document.getElementsByTagName('input');
		for (var i=0; i<dias.length; i++) 
		{       
			if (dias[i].type == "checkbox" && dias[i].checked == true)
			{
          		count++;
       		}
		}
		horas = horas*count*2;
		minutos=(minutos*count*2)/60;
		var cast_min=minutos.toString().split(".");
		horas=horas+(1*cast_min[0]);
		if(cast_min.length>1)
			minutos=(cast_min[1]/10)*60;
		else
			minutos=0;
		horasAsesoria=horas+":"+minutos+":"+"00";

		datos['idAsesoria']=idAsesoria;
		datos['horasAsesoria']=horasAsesoria;
		datos['nombreMateria']=nombreMateria;
		datos['salon']=salon;
		datos['periodo']=periodo;
		datos['matriculaAses']=asesor;
		datos['horario']=horario;
		datos['identificador']=1;
		
		var json_string = JSON.stringify(datos);
		xhr.open('POST','VOAsesoria.php',true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);
		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				if(txt=="duplicate")
				{
					alert("No se puede utilizar un ID de asesoría ya asignado...");
				}
				else if(txt=='1'){
					alert("Asesoría agregada correctamente...");
					window.close();
				}
				else
				{
					alert("No se puede agregar la asesoria. Verifique su información...");
				}
			}
		};
	}
	else if(option=='addAlumno')
	{
		var idAlumno=document.getElementById('idAlumno').value;
		var nombreAlum=document.getElementById('nombreAlumno').value;
		var apPAlum=document.getElementById('appAlumno').value;
		var apMAlum=document.getElementById('apmAlumno').value;
		var curpAlum=document.getElementById('curpAlumno').value;
		var telAlum=document.getElementById('telAlumno').value;
		var mailAlum=document.getElementById('mailAlumno').value;
		var direccionAlum=document.getElementById('direccionAlumno').value;
		var fechaInicio=document.getElementById('fechaInicio').value;
		var idPlanEstud=document.getElementById('selectPlanEstud').value;

		datos['idAlumno']=idAlumno;
		datos['nombreAlum']=nombreAlum;
		datos['apPAlum']=apPAlum;
		datos['apMAlum']=apMAlum;
		datos['curpAlum']=curpAlum;
		datos['telAlum']=telAlum;
		datos['mailAlum']=mailAlum;
		datos['direccionAlum']=direccionAlum;
		datos['fechaInicio']=fechaInicio;
		datos['idPlanEstud']=idPlanEstud;
		datos['identificador']=1;

		var json_string = JSON.stringify(datos);
		xhr.open('POST','VOAlumno.php',true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);

		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				if(txt=="duplicate")
				{
					alert("No se puede agregar un Alumno con el mismo ID...");
				}
				else if(txt=='1'){
					alert("Alumno agregado correctamente...");
					window.close();
				}
				else
				{
					alert("No se puede agregar el alumno. Verifique su información...");
				}
			}
		};
	}
	else if(option=='addAsesor')
	{
		var matriculaAsesor=document.getElementById('matriculaAses').value;
		var nombreAses=document.getElementById('nombreAses').value;
		var apPAses=document.getElementById('apPAses').value;
		var apMAses=document.getElementById('apMAses').value;
		var carrera=document.getElementById('carrera').value;
		var telAses=document.getElementById('telAses').value;
		var mailAses=document.getElementById('mailAses').value;
		var fechaInicio=document.getElementById('fechaInicio').value;
		
		datos['matriculaAsesor']=matriculaAsesor;
		datos['nombreAses']=nombreAses;
		datos['apPAses']=apPAses;
		datos['apMAses']=apMAses;
		datos['carrera']=carrera;
		datos['telAses']=telAses;
		datos['mailAses']=mailAses;
		datos['fechaInicio']=fechaInicio;
		datos['identificador']=4;

		var json_string = JSON.stringify(datos);
		xhr.open('POST','VOAsesor.php',true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);

		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				if(txt=="duplicate")
				{
					alert("No se puede agregar un Asesor con la misma matricula...");
				}
				else if(txt=='1'){
					alert("Asesor agregado correctamente...");
					window.close();
				}
				else
				{
					alert("No se puede agregar el asesor. Verifique su información...");
				}
			}
		};
	}
	else if(option.includes('alumnoEdit'))
	{
		var res = option.split("-");
		var idAlumno=document.getElementById('idAlumno').value;
		var nombreAlum=document.getElementById('nombreAlumno').value;
		var apPAlum=document.getElementById('appAlumno').value;
		var apMAlum=document.getElementById('apmAlumno').value;
		var curpAlum=document.getElementById('curpAlumno').value;
		var telAlum=document.getElementById('telAlumno').value;
		var mailAlum=document.getElementById('mailAlumno').value;
		var direccionAlum=document.getElementById('dirAlumno').value;
		var fechaInicio=document.getElementById('fechaInicio').value;
		var fechaFin=document.getElementById('fechaFin').value;
		var idEstatusAlum=document.getElementById('selectEstatus').value;
		var idPlanEstud=document.getElementById('selectPlanes').value;

		datos['idAlumno']=idAlumno;
		datos['nombreAlum']=nombreAlum;
		datos['apPAlum']=apPAlum;
		datos['apMAlum']=apMAlum;
		datos['curpAlum']=curpAlum;
		datos['telAlum']=telAlum;
		datos['mailAlum']=mailAlum;
		datos['direccionAlum']=direccionAlum;
		datos['fechaInicio']=fechaInicio;
		datos['fechaFin']=fechaFin;
		datos['idEstatusAlum']=idEstatusAlum;
		datos['idPlanEstud']=idPlanEstud;
		datos['idOriginal']=res[1];
		datos['curpOriginal']=res[2];
		datos['identificador']=5;

		var json_string = JSON.stringify(datos);
		xhr.open('POST','VOAlumno.php',true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);

		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				if(txt=="not_alumn")
				{
					alert("No existe un alumno para modificar...");
				}
				else if(txt=='1'){
					alert("Alumno modificado correctamente...");
					location.reload(true);
				}
				else
				{
					alert("No se puede modificar el alumno. Verifique su información...");
				}
			}
		};
	}
	else if(option.includes('asesorEdit'))
	{
		var res = option.split("-");
		var matriculaAses=document.getElementById('matriculaAses').value;
		var nombreAses=document.getElementById('nombreAses').value;
		var apPAses=document.getElementById('apPAses').value;
		var apMAses=document.getElementById('apMAses').value;
		var nombreCarrera=document.getElementById('nombreCarrera').value;
		var telAses=document.getElementById('telAses').value;
		var mailAses=document.getElementById('mailAses').value;
		var fechaInicio=document.getElementById('fechaInicio').value;
		var fechaFin=document.getElementById('fechaFin').value;
		var idEstatusServ=document.getElementById('selectEstatus').value;

		datos['matriculaAses']=matriculaAses;
		datos['nombreAses']=nombreAses;
		datos['apPAses']=apPAses;
		datos['apMAses']=apMAses;
		datos['nombreCarrera']=nombreCarrera;
		datos['telAses']=telAses;
		datos['mailAses']=mailAses;
		datos['fechaInicio']=fechaInicio;
		datos['fechaFin']=fechaFin;
		datos['idEstatusServ']=idEstatusServ;
		datos['matriculaOriginal']=res[1];
		datos['identificador']=5;

		var json_string = JSON.stringify(datos);
		xhr.open('POST','VOAsesor.php',true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);

		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				if(txt=="not_alumn")
				{
					alert("No existe un asesor para modificar...");
				}
				else if(txt=='1'){
					alert("Asesor modificado correctamente...");
					location.reload();
				}
				else
				{
					alert("No se puede modificar el asesor. Verifique su información...");
				}
			}
		};
	}
}

function hideDiv(value) {
	if(value=='asesorias')
	{
		document.getElementById("hide-form2").addEventListener('click', function() {
			slideToggle(document.getElementById("formDetalle"), 200);
		});
	}
	else if(value=='alumnos')
	{
		document.getElementById("hide-form-det-alumno").addEventListener('click', function() {
			slideToggle(document.getElementById("formDetalle"), 200);
			});
	}
	else if(value=='asesores')
	{
		document.getElementById("hide-form-det-asesores").addEventListener('click', function() {
			slideToggle(document.getElementById("formDetalle"), 200);
			});
	}
	else if(value=='materias')
	{
		document.getElementById("hide-form-det-materias").addEventListener('click', function() {
			slideToggle(document.getElementById("divListaMaterias"), 200);
			});
	}
	else if(value=='listas')
	{
		document.getElementById("hide-form-det-listas").addEventListener('click', function() {
			slideToggle(document.getElementById("divListaAsesorias"), 200);
			});
	}
	let slideUp = (target, duration=500) => {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.boxSizing = 'border-box';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout( () => {
		  target.style.display = 'none';
		  target.style.removeProperty('height');
		  target.style.removeProperty('padding-top');
		  target.style.removeProperty('padding-bottom');
		  target.style.removeProperty('margin-top');
		  target.style.removeProperty('margin-bottom');
		  target.style.removeProperty('overflow');
		  target.style.removeProperty('transition-duration');
		  target.style.removeProperty('transition-property');
		}, duration);
	  }
	
	  let slideDown = (target, duration=500) => {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
	
		if (display === 'none')
		  display = 'block';
	
		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = 'border-box';
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout( () => {
		  target.style.removeProperty('height');
		  target.style.removeProperty('overflow');
		  target.style.removeProperty('transition-duration');
		  target.style.removeProperty('transition-property');
		}, duration);
	  }
	  var slideToggle = (target, duration = 500) => 
	  {
		if (window.getComputedStyle(target).display === 'none') {
		  return slideDown(target, duration);
		} else {
		  return slideUp(target, duration);
		}
		
  	  }
}

function getMateriasPlan(valor)
  {
	var coso=document.getElementById('div-select-det');
	while(coso.firstChild){
		coso.removeChild(coso.firstChild);
	}
	var nombreMateria = document.createElement('select');
	nombreMateria.setAttribute('id','select-materia-det');
	nombreMateria.setAttribute('onchange','searchAsesoria(this.value)');
	coso.appendChild(nombreMateria);
	loadMaterias('select-materia-det',valor);
  }

function validatenumerics(key) 
{
	var keycode = (key.which) ? key.which : key.keyCode;
	if (keycode > 31 && (keycode < 48 || keycode > 57)) {
		return false;
	}
	else return true;
}

function addAsesoriaWindow()
{
	var myWindow = window.open("addAsesoria.html", "Añade asesoría nueva - SISREGAAA", "width=900,height=300,left=250,top=250");
	myWindow.focus();
}

function addAlumnoWindow()
{
	var myWindow = window.open("addAlumno.html", "Añade nuevo alumno - SISREGAAA", "width=1250,height=250,top=150");
	myWindow.focus();
}

function addAsesorWindow()
{
	var myWindow = window.open("addAsesor.html", "Añade nuevo asesor - SISREGAAA", "width=1250,height=250,top=150");
	myWindow.focus();
}

function addMateriaWindow()
{
	var buttonEvent = document.getElementById('sendButton').getAttribute('onclick');
	var mySubString = buttonEvent.substring(buttonEvent.lastIndexOf(",") + 1,buttonEvent.lastIndexOf(")"));
	var nameBox = mySubString.replace(/['"]+/g, '');
	var idAlumno = document.getElementById('idAlumno').value;
	var idPlan = document.getElementById('planDeEstud').value;
	var myWindow = window.open("linkMateriaAlumno.html?idAlumno="+idAlumno+"&idPlan="+idPlan, "Añade examen a un alumno - SISREGAAA", "width=600,height=300,top=150,left=250");
	myWindow.focus();
	myWindow.addEventListener("beforeunload", function (event) {
							searchIdAlumno(event,nameBox);
						});
}

function ChangeCase(elem)
{
	elem.value = elem.value.toUpperCase();
}

function activeLinkButton(value)
{
	var divLista = document.getElementById('detalle-listas');
	var divDetalleLista = document.getElementById('detalle-lista');
	var divForm = document.getElementById('div-form');
	if(value=="")
	{
		if(document.getElementById('add-alumno-list-div'))
		{
			document.getElementById('add-alumno-list-div').remove();
		}
		while(divLista.firstChild){
			divLista.removeChild(divLista.firstChild);
		}
		while(divDetalleLista.firstChild)
		{
			divDetalleLista.removeChild(divDetalleLista.firstChild);
		}
		return;
	}
	else
	{
		var divButton = document.createElement('div')
		divButton.setAttribute('class','add-alumno-list-div');
		divButton.setAttribute('id','add-alumno-list-div');

		var clickButton = document.createElement('a');
		clickButton.setAttribute('href','#');
		clickButton.setAttribute('onclick','addAlumnoListaWindow(document.getElementById(\'select-asesoria\').value);');

		var buttonAdd = document.createElement('img');
		buttonAdd.setAttribute('class','add-alumno-list-button');
		buttonAdd.setAttribute('src','img/addAlumnoListaButton.png');
		
		clickButton.appendChild(buttonAdd);
		divButton.appendChild(clickButton);
		divForm.parentNode.insertBefore(divButton,divForm.nextSibling);

		var xhr = new XMLHttpRequest();
		txt="";
		nom="";
		var temp = new Array();
		var datos = new Array();
		var data = {};
		data['identificador']=3;
		data['searchValue']=value;
		data['typeSearch']='idAsesoria';
		var json_string = JSON.stringify(data);
		xhr.open('POST',"VOAsesoria.php",true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);
		while(divLista.firstChild){
			divLista.removeChild(divLista.firstChild);
		}
		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				myObj = JSON.parse(this.responseText);
				for(var i = 0;i<myObj.length;i++)
				{
					temp[0] = myObj[i].idAsesoria;
					temp[1] = myObj[i].nombreMateria;
					temp[2] = myObj[i].nombreAses;
					temp[3] = myObj[i].salon;
					temp[4] = myObj[i].edificioSalon;
					temp[5] = myObj[i].horarioAsesoria;
					datos[i] = new Array(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]);
				}
				var formaDetail = createAsesDetail(datos[0]);
				divLista.appendChild(formaDetail);
			}
		};
		loadDetailList(value);
	}
}

function addAlumnoListaWindow(idAsesoria)
{
	var myWindow = window.open("linkAlumnoAsesoria.html?idAsesoria="+idAsesoria, "Añade alumno en asesoria - SISREGAAA", "width=450,height=250,top=150,left=250");
	myWindow.focus();
}

function getURLIdAsesoria()
{
	let params = new URLSearchParams(location.search);
	var idAsesoria = params.get('idAsesoria');
	var idAsesoriaText = document.getElementById('idAsesoria');
	idAsesoriaText.value = idAsesoria;
}

function getURLParamsExamen()
{
	let params = new URLSearchParams(location.search);
	var idAsesoria = params.get('idAlumno');
	var idAsesoriaText = document.getElementById('idAlumno');
	idAsesoriaText.value = idAsesoria;
	var idPlan = params.get('idPlan');
	loadMaterias('select-materias-plan',idPlan);
}

function linkAlumnoAses()
{
	var xhr = new XMLHttpRequest();
	txt="";
	var temp = new Array();
	var datos = new Array();
	var data = {};

	var idAsesoria = document.getElementById('idAsesoria').value;
	var idAlumno = document.getElementById('idAlumno').value;

	data['identificador']=1;

	
	if(idAlumno=="")
	{
		alert("Seleccione un alumno valido...");
		return;
	}
	else
	{
		data['idAsesoria']=idAsesoria;
		data['idAlumno']=idAlumno;
		data['identificador']=1;
		var json_string = JSON.stringify(data);
		xhr.open('POST',"VOListaAsesoria.php",true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);
		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				if(txt=='1'){
					alert("Alumno agregado correctamente...");
					window.close();
				}
				else
				{
					alert("No se puede agregar el alumno. Verifique su información...");
				}
			}
		};
	}
}

function linkMateriaAlumno()
{
	var xhr = new XMLHttpRequest();
	txt="";
	var data = {};

	var idMateria = document.getElementById('select-materias-plan').value;
	var idAlumno = document.getElementById('idAlumno').value;
	var idEstatus = document.getElementById('select-estatus-materia').value;
	var calificacion = document.getElementById('calificacion').value;
	var fechaExamen = document.getElementById('fechaExamen').value;

	data['identificador']=2;

	if(idAlumno=="")
	{
		alert("Seleccione un alumno valido...");
		return;
	}
	else
	{
		data['idAlumno']=idAlumno;
		data['idMateria']=idMateria;
		data['idEstatus']=idEstatus;
		data['calificacion']=calificacion;
		data['fechaExamen']=fechaExamen;
		data['identificador']=2;
		var json_string = JSON.stringify(data);
		xhr.open('POST',"VOEstatusMateria.php",true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_string);
		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				if(txt=="duplicate")
				{
					alert("No se puede agregar más de un examen de la misma materia en una misma fecha...");
				}
				else if(txt=='1'){
					alert("Examen agregado correctamente...");
					window.close();
				}
				else
				{
					alert("No se puede agregar el examen. Verifique su información...");
				}
			}
		};
	}
}

function checkPeriodo()
{
	var xhr = new XMLHttpRequest();
	txt="";
	var temp = new Array();
	var datos = new Array();
	var data = {};
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	var cuerrentDate=yyyy+"-"+mm+"-"+dd;
	data['identificador']=1;
	data['fecha']=cuerrentDate;
	var json_string = JSON.stringify(data);
	xhr.open('POST',"VOPeriodo.php",true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(json_string);

	xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				myObj = JSON.parse(this.responseText);
				if(myObj=="not_period")
				{
					if(confirm("No existe un periodo activo para la fecha actual. Por favor, cree uno"))
					{
						var addPeriodWindow = window.open("crearPeriodo.html", "Crea un periodo de trabajo - SISREGAAA", "width=400,height=250,top=150,left=250");
						addPeriodWindow.focus();
						addPeriodWindow.addEventListener("beforeunload", function (event) {
							location.reload(true);
						});
					}
				}
			}
		};
}

function addPeriodo()
{
	var xhr = new XMLHttpRequest();
	txt="";
	var temp = new Array();
	var datos = new Array();
	var data = {};
	data['identificador']=2;

	if(document.getElementById('inicioPeriodo').value!="" & document.getElementById('finPeriodo').value!="")
	{
		data['fechaInicio'] = document.getElementById('inicioPeriodo').value;
		data['fechaFin'] = document.getElementById('finPeriodo').value;
		var json_string = JSON.stringify(data);
		xhr.open('POST',"VOPeriodo.php",true);
		xhr.setRequestHeader("Content-type","application/json");
		xhr.send(json_string);

		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				txt += this.responseText;
				myObj = JSON.parse(this.responseText);
				if(myObj=='1')
				{
					alert("Periodo agregado correctamente...");
					window.close();
				}
				else if(myObj=="duplicate")
				{
					alert("No se puede agregar un Periodo que inicie o termine en la misma fecha que otro periodo creado anteriormente...");
				}
				else
				{
					alert("No se puede agregar el periodo. Verifique su información...");
				}
			}
		};
	}
	else
	{
		alert("Debe de elegir ambas fechas válidas...")
	}
}