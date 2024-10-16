document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fullForm');
    const submitButton = document.getElementById('submitButton');
    
    const fieldsToCheck = ['name', 'email', 'idade', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'pais'];

    // Função para verificar se todos os campos estão preenchidos
    function checkFields() {
        const allFieldsFilled = fieldsToCheck.every((fieldId) => {
            const field = document.getElementById(fieldId);
            return field.value.trim() !== '';  // Verifica se o campo não está vazio
        });

        // Habilita o botão de submit se todos os campos estiverem preenchidos
        submitButton.disabled = !allFieldsFilled;
    }

    // Adiciona o evento 'input' para verificar os campos conforme o usuário digita
    form.addEventListener('input', checkFields);

    // Buscar CEP quando o campo perder o foco
    document.getElementById('cep').addEventListener('blur', buscarCep);

    async function buscarCep() {
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
        if (cep.length !== 8) {
            alert('Por favor, insira um CEP válido com 8 dígitos.');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }

            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
            document.getElementById('pais').value = 'Brasil';

            // Revalidar os campos após o preenchimento automático
            checkFields();
            
        } catch (error) {
            alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    }

    // Redirecionar ao enviar o formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o comportamento padrão

        // Verifica se o botão de submit está habilitado
        if (!submitButton.disabled) {
            window.location.href = 'https://go.pepper.com.br/mhgry'; // Redireciona para a página desejada
        }
    });
});
