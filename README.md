# MyTask
## To do list com bootstrap e javascript puro
site: https://thiagodomingoss.github.io/MyTask/

## Preview
![taskadd](https://user-images.githubusercontent.com/99504975/173150753-ba0931f3-4f8b-4678-99f2-1ca9067ea067.gif)
![taskcheck](https://user-images.githubusercontent.com/99504975/173150764-e60da8e5-baf8-4b52-81f9-b3f0a14e1473.gif)



## Explicando o código

![localstorage](https://user-images.githubusercontent.com/99504975/173130410-406116da-ff04-4193-aeac-77b0496f71c4.png)
<p>Para começar, armazenamos as requisições ao Localstorage em consts para usa-las em funções e interagir com o Localstorage.</p> 

![addbutton](https://user-images.githubusercontent.com/99504975/173131635-97836e98-74c9-41a5-bfbf-c4e2c67741e4.png)
<p>Em seguida, adicionamos um evento de click no botão "add", que chama uma função "inserirItem"</p>

![inserirItem](https://user-images.githubusercontent.com/99504975/173131810-e51cb69a-af3c-4441-9488-f5fab16371c2.png)
<p>A função INSERIRITEM faz uma checagem se há algum valor no input, no caso de não haver a função ativa um ALERT que diz 'write something!'(escreva algo!) para que não seja adicionada tasks sem conteúdo. </p>
<p>Havendo conteúdo, a função faz uma requizição GET ao localstorage, que da 1 vez retornará um array vazio, e faz um push(adiciona) nesse array um objetoCom duas chaves, uma tarefa que recebe o valor atual do input e a segunda 'status' que vai receber vazio de inicio, mas que servirá para receber um valor de checked da task.</p>
<p>Então faz um requisição SET, enviando o objeto para o localstorage e logo em seguida chama a função ATUALIZARTELA.</p>

![atualizarTela](https://user-images.githubusercontent.com/99504975/173133328-1bdda77a-7716-4abf-8054-921000a94f43.png)
<p>Essa função é chamada sempre que occorre alteração nos componentes e no localstorage(onde estão armazenados os componentes em forma de objeto).</p>
<p>Sua primeira tarefa e limpar a tela</p>

![limparTela](https://user-images.githubusercontent.com/99504975/173133783-ca65ce4e-2262-4ef0-b646-0a79d3e144d8.png)
<p>Onde basicamente, pega a taskList(lista de tarefas) e atribui um valor de string vazia, que vai por consequência limpar a tela.</p>
<p>Feito isso, a função faz um GET no locastorage e tendo um ou mais objetos fará uma iteração por esse array de objetos por meio de um forEach que receberá como parâmetro o item(objeto contendo chaves e valores) e seu indice(posição) nesse array e enviará para uma função chamada CRIARITEM.</p>

![criarItem](https://user-images.githubusercontent.com/99504975/173135000-c610802c-d765-41f0-ad64-743e28ae99f9.png)
<p>Essa função receberá como parâmetro os valores contidos no objeto (tarefa e status) e seu indice(posição).
Armazenará numa const 'item' a criação de uma 'div', atribuirá classes a essa div por meio do classlist.add e adicionará ao conteúdo dessa div: </p>
<p>Um input CHECKBOX que receberá os parâmetros indice e o status</p>
<p>Uma div com o parâmetro tarefa</p>
<p>Um buttom que receberá o parâmetro indice</p>
<p>Então atribuirá esse item à lista de tarefas por meio do metodo appendChild, para que seja exibido na tela.</p>
<p>Ao final, atribui uma string vazia ao input de tarefas, para que não seja necessário apagar manualmente sempre que adicionar uma nova tarefa.</p>

![atualizarTela](https://user-images.githubusercontent.com/99504975/173137180-0ffa5d21-f87d-4a2f-959b-f85dc282d630.png)
<p>Então, o atualizartela fará uma filtragem no localstorage por meio do filter, armazenando os obetos checados e não checados em variáveis separadas e em seguida pegam a quantidade de objetos de cada uma das variáveis por meio do length e atribui esses valores aos badges que são mostrados na tela e estão contidos nos botões de filtragem.</p>
<p>Por fim, chamará a função filterItems</p>

![filterItems](https://user-images.githubusercontent.com/99504975/173138360-4db2cb0a-3bfa-4aa2-abf1-786a0bd98eb5.png)
<p>A função filterItems fará uma checagem, onde os botões ALL, UNDONE E DONE formam um array e recebem os indices respectivamente 0(all), 1(undone) e 2(done).</p>
<p>Se o o botão (1)UNDONE contém a classe 'active' então é chamada a função FILTEREDEUNDONE</p>
<p>Se o o botão (2)DONE contém a classe 'active' então é chamada a função FILTEREDEDONE</p>

![filter-done-undone](https://user-images.githubusercontent.com/99504975/173139156-bbad8655-b2f4-4d61-bd0f-113f14791262.png)
<p>Essa funções acessam os elementos filhos da lista de tarefas por meio do tasklist.children e filtram as tarefas que contém, ou não no caso da undone, checked por meio do task.childNodes que é um array onde o item (1)  é o input checkbox que contém o status onde é armazenado o valor checked</p>
<p>Na filteredUndone, os valores que contém o checked, ou seja, task já checada, são enviadas para a função hidetask. Já na filteredDone são as não chegadas que são enviadas.</p>

![hidetask](https://user-images.githubusercontent.com/99504975/173142109-fcde555d-8742-48d8-b789-6fecfd70fc04.png)
<p>A função hidetask faz uma iteração nesse array de tasks e remove a classe d-flex do boostrap e aplica a classe hide que aplica um display: none e assim não será exibida na tela, porém sem alterar o array principal com todas as tasks.</p>

![tasklist-click](https://user-images.githubusercontent.com/99504975/173142784-15ccb4b8-4942-444f-8e94-641b63939a26.png)
<p>Agora, partindo para as interações de deletar e checar a tarefa, pegamos a lista de tarefas e adicionamos um evento de click que cha a função clickItem.</p>

![clickItem-del-check](https://user-images.githubusercontent.com/99504975/173143001-620335d6-a559-44dd-b9c9-1ae8114d2581.png)
<p>Essa função recebe um evento(click) como parâmetro e o alvo desse evento é armazenado em uma const element que passará por uma checagem.</p>
<p>Se esse elemento capturado pelo evento de click tem em seu type o valor button, então ele é o botão de delete. </p>
<p>Logo, captura-se o seu indice por meio de data attribute e invoca-se a função removeItem.</p>

![removeItem](https://user-images.githubusercontent.com/99504975/173143572-f9e05f0a-2028-4805-85cd-abb0f7b02af7.png)
<p>Essa função recebe o indice do item como parâmetro, faz uma requisição GET no localstorage e aplica o metodo splice, que recebe dois parâmetros, primeiro, a posição do item no arraye segundo a quntidadde de items que devem ser deletados desse array, partindo da posição recebida no primeiro parâmetro a diante. No fim atualiza a tela para que o item apagado do localstoragem não seja mais exibido na tela.</p>

![checkItem](https://user-images.githubusercontent.com/99504975/173144289-f38d4c37-f189-4dca-9b1c-44885576360e.png)
<p>A função atualizar item funciona de forma semelhante, recebendo indice e requisitando localstorage, porém faz uma checagem por meio de um ternário na chave status do objeto, onde se o status do objeto estiver vazio retornará true e então o status receberá o valor 'checked' e se retornar false o status receberá uma string vazia.</p>

![clearall-click](https://user-images.githubusercontent.com/99504975/173145300-94887266-d185-4129-8e6e-b7d8183474da.png)
<p>Por fim, pegamos o botão CLEAR e adicionamos um evento de click que invoca a função clearAll</p>

![clearall](https://user-images.githubusercontent.com/99504975/173145462-68c6cbd7-4948-4ffc-bed2-5ac44c791825.png)
<p>Essa função faz uma checagem por meio do CONFIRM que da duas opções de confirm(true) e cancel(false), após retornados os valores eles são armazenados na variável ANSWER e no if é feita a checagem e se a resposta for true e feita uma requisição no localstorage para remover o item que foi clicado, por fim, é chamado o atualizartela para que ele faça uma nova leitura do localstorage e apresente apenas os items presentes lá e os apresente na tela.</p>
