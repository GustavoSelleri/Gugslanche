const formatarPreco = (number) => {
    const formatter = new Intl.NumberFormat('pt-BR', 
    {style: 'currency', currency: 'BRL'});
        
    return formatter.format(number);
}

export default formatarPreco