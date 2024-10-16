document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fullForm');
    const submitButton = document.getElementById('submitButton');
    
    const fieldsToCheck = ['name', 'email', 'idade', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'pais'];

    form.addEventListener('input', () => {
        const allFieldsFilled = fieldsToCheck.every((fieldId) => {
            const field = document.getElementById(fieldId);
            return field.value.trim() !== '';
        });

        submitButton.disabled = !allFieldsFilled;
    });
    
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
            
        } catch (error) {
            alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    }
});
